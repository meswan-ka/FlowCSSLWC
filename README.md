# Custom Flow Size/CSS Lightning Web Component

A Lightning Web Component that enables custom modal sizing and CSS styling for Salesforce Flow screens. This component allows administrators and developers to easily adjust Flow modal sizes and apply custom styles to Flow containers, modals, and elements without modifying the underlying Flow structure.

[![Deploy to Salesforce](https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png)](https://githubsfdeploy.herokuapp.com?owner=Marceswan&repo=FlowCSSLWC-1)

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [CSS Selector Reference](#css-selector-reference)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Limitations](#limitations)

## Features

- ✅ **Modal Size Control** - Choose from Small (30%), Medium (60%), or Large (80%) modal sizes
- ✅ **Custom Property Editor** - User-friendly interface in Flow Builder
- ✅ Apply custom CSS to Flow screens
- ✅ Style Flow modal containers (width, height, background, etc.)
- ✅ Override default SLDS styles
- ✅ Support for both inline and class-based styling
- ✅ Automatic cleanup when Flow is closed
- ✅ Works with Screen Flows only
- ✅ No code deployment needed after initial setup

## Installation

### Deploy to Salesforce Org

1. **Using Salesforce CLI:**
   ```bash
   sfdx force:auth:web:login -a YourOrgAlias
   sfdx force:source:deploy -p force-app -u YourOrgAlias
   ```

2. **Using VS Code:**
   - Right-click on the `force-app` folder
   - Select "Deploy Source to Org"

3. **Manual Installation:**
   - Create a new Lightning Web Component named `flowCSSLWC`
   - Copy the contents of each file to your org

## Usage

### Adding to a Flow

1. **Edit your Screen Flow:**
   - Open Flow Builder
   - Add a new Screen element or edit an existing one

2. **Add the Custom Flow Size/CSS Component:**
   - In the screen editor, search for "Custom Flow Size/CSS" in the components panel
   - Drag it onto your screen (typically at the top)

3. **Configure Component Settings:**
   - Click on the component to open the custom property editor
   - Select your desired Modal Size:
     - Small (30% width)
     - Medium (60% width) - Default
     - Large (80% width)
   - Enter any additional CSS rules in the CSS Styling field

4. **Save and Activate your Flow**

### Component Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| modalSize | String | Controls the width of the Flow modal (small, medium, large) | medium |
| cssStyling | String | CSS rules to apply to the Flow container | - |

## Examples

### Example 1: Using the Modal Size Property
Simply select your desired modal size from the dropdown in the property editor:
- **Small**: 30% screen width - Great for simple forms or confirmations
- **Medium**: 60% screen width - Default size, suitable for most use cases  
- **Large**: 80% screen width - Ideal for complex forms or data displays

No CSS required for basic sizing!

### Example 2: Custom Flow Background and Padding
```css
.flowruntimeBody {
    background-color: #f4f6f9;
    padding: 2rem;
}

.flowContainer {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 2rem;
}
```

### Example 3: Style Flow Headers and Buttons
```css
/* Style Flow header */
.flowruntimeBody h2 {
    color: #0070d2;
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #e5e5e5;
}

/* Style navigation buttons */
.flowruntimeBody .slds-button {
    border-radius: 4px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.flowruntimeBody .slds-button_brand {
    background-color: #0070d2;
    border-color: #0070d2;
}

.flowruntimeBody .slds-button_brand:hover {
    background-color: #005fb2;
    border-color: #005fb2;
}
```

### Example 4: Responsive Design
```css
/* Desktop styles */
.slds-modal__container {
    width: 90% !important;
    max-width: 1400px !important;
}

/* Tablet and mobile adjustments */
@media (max-width: 768px) {
    .slds-modal__container {
        width: 95% !important;
        min-width: unset !important;
    }
    
    .flowContainer {
        padding: 1rem !important;
    }
}
```

### Example 5: Multi-Column Layout
```css
/* Create a two-column layout for form fields */
.flowContainer .slds-form-element {
    display: inline-block;
    width: 48%;
    margin-right: 2%;
}

.flowContainer .slds-form-element:nth-child(even) {
    margin-right: 0;
}

/* Full width for specific fields */
.flowContainer .slds-form-element--full-width {
    width: 100% !important;
}
```

### Example 6: Custom Progress Indicator
```css
/* Style the Flow progress indicator */
.slds-progress {
    height: 8px;
    background-color: #ecebea;
    border-radius: 4px;
}

.slds-progress__bar {
    background-color: #00b37d;
    border-radius: 4px;
}

.slds-progress__list {
    margin-bottom: 2rem;
}
```

### Example 7: Error Message Styling
```css
/* Custom error message styling */
.flowruntimeBody .slds-text-color_error,
.flowruntimeBody .errorMessage {
    background-color: #fef1f1;
    border: 1px solid #ea001e;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem 0;
}

.flowruntimeBody .slds-form-element__help {
    color: #ea001e;
    font-weight: 600;
}
```

### Example 8: Advanced Theming
```css
/* Define CSS variables for consistent theming */
:root {
    --flow-primary-color: #1b5297;
    --flow-secondary-color: #ff6900;
    --flow-background: #f8f9fa;
    --flow-text-color: #333333;
    --flow-border-radius: 8px;
}

/* Apply theme throughout Flow */
.flowruntimeBody {
    background-color: var(--flow-background);
    color: var(--flow-text-color);
}

.flowContainer {
    background-color: white;
    border-radius: var(--flow-border-radius);
    border: 1px solid #e0e0e0;
}

/* Themed buttons */
.flowruntimeBody .slds-button_brand {
    background-color: var(--flow-primary-color);
    border-color: var(--flow-primary-color);
}

/* Themed links */
.flowruntimeBody a {
    color: var(--flow-primary-color);
}

.flowruntimeBody a:hover {
    color: var(--flow-secondary-color);
}
```

## CSS Selector Reference

### Common Flow Selectors

| Selector | Description |
|----------|-------------|
| `.slds-modal__container` | The main modal container |
| `.flowruntimeBody` | The Flow runtime body wrapper |
| `.flowContainer` | The inner Flow container |
| `.slds-button` | All buttons in the Flow |
| `.slds-button_brand` | Primary/Next buttons |
| `.slds-button_neutral` | Secondary/Previous buttons |
| `.slds-form-element` | Form field containers |
| `.slds-form-element__label` | Field labels |
| `.slds-form-element__control` | Field input containers |
| `.slds-input` | Text input fields |
| `.slds-select` | Dropdown/picklist fields |
| `.slds-checkbox` | Checkbox inputs |
| `.slds-radio` | Radio button inputs |

### Flow-Specific Classes

| Selector | Description |
|----------|-------------|
| `.flow-header` | Flow header section |
| `.flow-footer` | Flow footer with navigation |
| `.flowruntimeNavigationBar` | Navigation button container |
| `.flow-screen-content` | Main content area |

## Best Practices

### 1. Use Specific Selectors
```css
/* Good - Specific to Flow context */
.flowruntimeBody .slds-button_brand {
    background-color: #0070d2;
}

/* Avoid - Too generic */
.slds-button {
    background-color: #0070d2;
}
```

### 2. Always Use !important Carefully
```css
/* Use !important only when necessary to override SLDS */
.slds-modal__container {
    width: 80% !important; /* Needed to override inline styles */
}

/* Avoid using !important for custom classes */
.my-custom-class {
    color: blue; /* No !important needed */
}
```

### 3. Test Responsive Behavior
Always test your CSS on different screen sizes:
```css
/* Mobile-first approach */
.flowContainer {
    padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .flowContainer {
        padding: 2rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .flowContainer {
        padding: 3rem;
    }
}
```

### 4. Maintain Accessibility
```css
/* Ensure sufficient contrast */
.flowruntimeBody {
    color: #333; /* Dark text on light background */
    background-color: #fff;
}

/* Maintain focus indicators */
.flowruntimeBody .slds-button:focus {
    box-shadow: 0 0 3px #0070d2;
    outline: none;
}
```

## Troubleshooting

### Styles Not Applying

1. **Check CSS Syntax:**
   ```css
   /* Ensure proper CSS syntax */
   .className {
       property: value;
   }
   ```

2. **Increase Specificity:**
   ```css
   /* If styles aren't applying, increase specificity */
   .flowruntimeBody .flowContainer .slds-button {
       /* Your styles */
   }
   ```

3. **Use Browser DevTools:**
   - Right-click on the Flow element
   - Select "Inspect Element"
   - Check if styles are being overridden

### Modal Width Not Changing

The component now includes automatic selectors for common modal classes. If still not working:

1. **Inspect the modal structure** in your specific org
2. **Add custom selectors** based on your findings:
   ```css
   /* Add your specific modal selector */
   .your-modal-class {
       width: 80% !important;
   }
   ```

### Performance Issues

If experiencing slow performance:

1. **Minimize CSS rules** - Use only necessary styles
2. **Avoid complex selectors:**
   ```css
   /* Avoid */
   .a > .b > .c > .d > .e { }
   
   /* Better */
   .specific-class { }
   ```

3. **Reduce use of universal selectors:**
   ```css
   /* Avoid */
   * {
       box-sizing: border-box;
   }
   
   /* Better - target specific elements */
   .flowContainer * {
       box-sizing: border-box;
   }
   ```

## Limitations

1. **Screen Flows Only** - This component only works with Screen Flows
2. **Shadow DOM Boundaries** - Some deeply nested components may not be styleable
3. **Platform Updates** - Salesforce updates may change class names or structure
4. **Performance** - Excessive CSS can impact Flow performance
5. **Mobile App** - Limited support in Salesforce Mobile App

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify CSS syntax using online validators
3. Test in different browsers
4. Review Salesforce Known Issues

## License

This component is provided as-is for use in Salesforce orgs. Feel free to modify and extend as needed for your organization's requirements.

---

**Created by:** Marc Swan
**Version:** 2.0.0  
**Last Updated:** July 14, 2025

## Changelog

### Version 2.0.0 (July 14, 2025)
- Added modal size control property with Small (30%), Medium (60%), and Large (80%) options
- Created custom property editor for better user experience in Flow Builder
- Improved style injection for better modal width control
- Updated component masterLabel to "Custom Flow Size/CSS"
- Added Deploy to Salesforce button for easy installation