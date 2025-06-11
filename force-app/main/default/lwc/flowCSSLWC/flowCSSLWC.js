import { LightningElement, api } from 'lwc';

export default class FlowCSSLWC extends LightningElement {
    @api cssStyling;
    _hasInjectedStyles = false;

    connectedCallback() {
        if (this.cssStyling) {
            // Delay to ensure Flow modal is rendered
            setTimeout(() => {
                this.applyCustomStyles();
            }, 100);
        }
    }

    renderedCallback() {
        if (this.cssStyling && !this._hasInjectedStyles) {
            this.applyCustomStyles();
        }
    }

    applyCustomStyles() {
        // Create a style element to hold our custom CSS
        const styleId = 'ka-flow-custom-styles';
        let styleElement = this.template.querySelector(`[data-id="${styleId}"]`);
        
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.setAttribute('data-id', styleId);
            this.template.appendChild(styleElement);
        }

        // Apply the CSS to the style element
        styleElement.textContent = this.cssStyling;

        // Also try to inject styles into the parent Flow container
        // This attempts to style elements outside the shadow DOM
        this.injectGlobalStyles();
        
        // Try to apply styles to the Flow modal directly
        this.applyFlowModalStyles();
        
        this._hasInjectedStyles = true;
    }

    injectGlobalStyles() {
        const globalStyleId = 'ka-flow-global-styles';
        let globalStyle = document.getElementById(globalStyleId);
        
        if (!globalStyle) {
            globalStyle = document.createElement('style');
            globalStyle.id = globalStyleId;
            document.head.appendChild(globalStyle);
        }
        
        // Inject the CSS globally to affect the Flow container
        globalStyle.textContent = this.cssStyling;
    }

    applyFlowModalStyles() {
        // Try multiple approaches to find and style the Flow modal
        
        // Approach 1: Look for the modal in the document
        const modalContainers = document.querySelectorAll('.modal-container, .slds-modal__container, .flowruntimeBody');
        modalContainers.forEach(container => {
            if (container) {
                // Apply inline styles as a fallback
                container.style.minWidth = '80%';
                container.style.width = '80%';
            }
        });

        // Approach 2: Look for parent elements and traverse up
        let currentElement = this.template.host;
        while (currentElement) {
            if (currentElement.classList && 
                (currentElement.classList.contains('modal-container') || 
                 currentElement.classList.contains('slds-modal__container') ||
                 currentElement.classList.contains('flowruntimeBody'))) {
                currentElement.style.minWidth = '80%';
                currentElement.style.width = '80%';
            }
            currentElement = currentElement.parentElement;
        }

        // Approach 3: Add more specific selectors
        const enhancedStyles = `
            ${this.cssStyling}
            
            /* Additional Flow-specific selectors */
            .slds-modal__container {
                min-width: 80% !important;
                width: 80% !important;
            }
            
            .flowruntimeBody {
                min-width: 80% !important;
            }
            
            .flowruntimeBody .flowContainer {
                min-width: 100% !important;
            }
            
            /* Target various modal implementations */
            [class*="modal"] [class*="container"] {
                min-width: 80% !important;
            }
            
            /* Target by data attributes if present */
            [data-aura-class*="uiModal"] .modal-container {
                min-width: 80% !important;
            }
        `;
        
        // Update the global styles with enhanced selectors
        const globalStyle = document.getElementById('ka-flow-global-styles');
        if (globalStyle) {
            globalStyle.textContent = enhancedStyles;
        }
    }

    disconnectedCallback() {
        // Clean up global styles when component is removed
        const globalStyle = document.getElementById('ka-flow-global-styles');
        if (globalStyle) {
            globalStyle.remove();
        }
        this._hasInjectedStyles = false;
    }
}