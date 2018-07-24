var tpl = "<style> :host {\n        display: block;\n        position: -webkit-sticky;\n        position: sticky;\n        top: 0;\n        background: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n        font-family: var(--myuw-app-bar-font, var( --myuw-font, Arial, sans-serif));\n        color: var(--myuw-app-bar-color, var(--myuw-primary-color, #fff));\n    }\n\n    :host([hidden]) {\n        display: none;\n    }\n\n    :host([font-loaded]) {\n        color: var(--myuw-app-bar-color, var(--myuw-primary-color, #fff));\n    }\n\n    #myuw-app-bar {\n        font-size: 14px;\n        font-weight: 500;\n        -webkit-font-smoothing: antialiased;\n        background-color: inherit;\n        z-index: 80;\n        width: 100%;\n        height: 64px;\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        padding: 0 16px;\n        margin: 0;\n        transition: box-shadow 0.3s ease-in-out;\n    }\n\n    #myuw-app-bar.shadow {\n        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n    }\n\n    #myuw-app-bar .region {\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-orient: horizontal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-grid-row-align: center;\n        align-items: center;\n        -webkit-align-content: center;\n        align-content: center;\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n        justify-content: flex-start;\n    }\n\n    #region__navigation {\n        margin-right: 16px;\n    }\n\n    #region__profile {\n        margin-left: 6px;\n    }\n\n    #region__notifications,\n    #region__help {\n        margin: 0 6px;\n    }\n\n    #title {\n        height: 100%;\n        display: flex;\n        flex: auto;\n        align-items: center;\n    }\n\n    #myuw-app-bar__title {\n        font-size: 18px;\n        font-weight: 500;\n    }\n\n    #myuw-app-bar__title a {\n        text-decoration: none;\n        color: inherit;\n    }\n\n    #myuw-app-bar__title a:hover,\n    #myuw-app-bar__title a:visited,\n    #myuw-app-bar__title > span:hover {\n            text-decoration: none;\n            cursor: pointer;\n            color: inherit;\n    } </style> <div id=\"myuw-app-bar\" class=\"myuw-app-bar\"> <div class=\"region\" id=\"region__navigation\"> <slot id=\"navigation-slot\" name=\"myuw-navigation\"> </div> <div id=\"title\"> <h1 id=\"myuw-app-bar__title\"></h1> </div> <div class=\"region\" id=\"region__help\"> <slot id=\"help-slot\" name=\"myuw-help\"> </div> <div class=\"region\" id=\"region__notifications\"> <slot id=\"notifications-slot\" name=\"myuw-notifications\"> </div> <div class=\"region\" id=\"region__profile\"> <slot id=\"profile-slot\" name=\"myuw-profile\"> </div> </div> ";

class MyuwAppBar extends HTMLElement {
    constructor() {
        super();

        // Create a shadowroot for this element
        this.attachShadow({mode: 'open'});

        // Append the custom HTML to the shadowroot
        this.shadowRoot.appendChild(MyuwAppBar.template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return [
            'theme-name',
            'theme-url',
            'app-name',
            'app-url'
        ];
    }

    /**
    *   Web component lifecycle hook to update changed properties
    */
    attributeChangedCallback(name, oldValue, newValue) {
        // Update the attribute internally
        this[name] = newValue;
        // Update the component
        this.updateComponent(name, newValue);

    }

    /**
    *   When component is first attached to the DOM,
    *   get its defined attributes and listen for
    *   scrolling
    */
    connectedCallback() {
        // Get all attributes
        this['theme-name']      = this.getAttribute('theme-name');
        this['theme-url']       = this.getAttribute('theme-url');
        this['app-name']        = this.getAttribute('app-name');
        this['app-url']         = this.getAttribute('app-url');

        // Attach scroll listener
        window.addEventListener('scroll', e => {
            if (window.scrollY !== 0) {
                this.shadowRoot.getElementById('myuw-app-bar').classList.add('shadow');
            } else {
                this.shadowRoot.getElementById('myuw-app-bar').classList.remove('shadow');
            }
        });

        this.updateComponent();
    }

    /**
    *   Clean up event listeners if element is removed from the DOM
    */
    disconnectedCallback() {
        window.removeEventListener('scroll', e => {
            this.shadowRoot.getElementById('myuw-app-bar').classList.remove('shadow');
        });
    }

    /**
    *   Assemble the HTML to be used in the top bar <h1> tag based on
    *   whether the requisite properties exist.
    *   @return {String} htmlString A string for the HTML to add to the shadow DOM
    */
    buildTitleString() {

        var htmlString = '';

        if (this['theme-name'] !== null) {
            if (this['theme-url'] !== null) {
                htmlString += '<a href="' + this['theme-url'] + '" target="_self" aria-label="' + this['theme-name'] + '">'
                    + this['theme-name'] + '</a>';
            } else {
                htmlString += '<span>' + this['theme-name'] + '</span>';
            }
        }

        if (this['app-name'] !== null) {
            htmlString += '&nbsp;';
            if (this['app-url'] !== null) {
                htmlString += '<a href="' + this['app-url'] + '" target="_self" aria-label="' + this['app-name'] + '">'
                    + this['app-name'] + '</a>';
            } else {
                htmlString += '<span tabindex="0" aria-label="' + this['app-name'] + '">' + this['app-name'] + '</span>';
            }
        }

        return htmlString;

    }

    /**
    *   Update the component state depending on changed properties
    *   and/or font loading
    */
    updateComponent() {
        this.shadowRoot.getElementById('myuw-app-bar__title').innerHTML = this.buildTitleString();
    }
}

MyuwAppBar.template = (function template(src) {
  const template = (document.createElement('template'));
  template.innerHTML = src;
  return template;
})(tpl);

window.customElements.define('myuw-app-bar', MyuwAppBar);

export { MyuwAppBar };
