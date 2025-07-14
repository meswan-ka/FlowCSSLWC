import { LightningElement, api, track } from 'lwc';

export default class FlowCSSLWCPropertyEditor extends LightningElement {
    _inputVariables = [];
    @track modalSize = 'medium';
    @track cssStyling = '';

    get sizeOptions() {
        return [
            { value: 'small', label: 'Small (30%)', selected: this.modalSize === 'small' },
            { value: 'medium', label: 'Medium (60%)', selected: this.modalSize === 'medium' },
            { value: 'large', label: 'Large (80%)', selected: this.modalSize === 'large' }
        ];
    }

    @api 
    get inputVariables() {
        return this._inputVariables;
    }
    
    set inputVariables(variables) {
        this._inputVariables = variables || [];
        if (variables && variables.length > 0) {
            let modalSizeFound = false;
            variables.forEach(variable => {
                if (variable.name === 'modalSize') {
                    modalSizeFound = true;
                    if (variable.value) {
                        this.modalSize = variable.value;
                    }
                } else if (variable.name === 'cssStyling' && variable.value) {
                    this.cssStyling = variable.value;
                }
            });
            
            // If modalSize wasn't in the inputVariables, ensure we dispatch the default
            if (!modalSizeFound) {
                setTimeout(() => {
                    this.dispatchFlowValueChangeEvent('modalSize', this.modalSize);
                }, 0);
            }
        }
    }

    @api
    validate() {
        const validity = [];
        return validity;
    }

    connectedCallback() {
        // Dispatch initial values to ensure Flow Builder has them
        setTimeout(() => {
            this.dispatchFlowValueChangeEvent('modalSize', this.modalSize);
            if (this.cssStyling) {
                this.dispatchFlowValueChangeEvent('cssStyling', this.cssStyling);
            }
        }, 0);
    }

    handleModalSizeChange(event) {
        this.modalSize = event.target.value;
        this.dispatchFlowValueChangeEvent('modalSize', this.modalSize);
    }

    handleCssStylingChange(event) {
        this.cssStyling = event.target.value;
        this.dispatchFlowValueChangeEvent('cssStyling', this.cssStyling);
    }

    dispatchFlowValueChangeEvent(variableName, value) {
        const valueChangeEvent = new CustomEvent('configuration_editor_input_value_changed', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                name: variableName,
                newValue: value,
                newValueDataType: 'String'
            }
        });
        this.dispatchEvent(valueChangeEvent);
    }
}