var tpl = "<style> :host([hidden]) {\n        display: none;\n    }\n\n    #myuw-app-bar {\n        position: -webkit-sticky;\n        position: sticky;\n        top: 0;\n        background: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n        font-family: var(--myuw-app-bar-font, var( --myuw-font, Arial, sans-serif));\n        font-size: 14px;\n        font-weight: var(--myuw-app-bar-font-weight, 400);\n        -webkit-font-smoothing: antialiased;\n        background-color: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n        color: var(--myuw-app-bar-color, var(--myuw-primary-color, #fff));\n        z-index: var(--z-index, 80);\n        width: 100%;\n        height: 64px;\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        padding: 0 16px;\n        margin: 0;\n        transition: box-shadow 0.3s ease-in-out;\n    }\n\n    #myuw-app-bar.shadow {\n        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n    }\n\n    #myuw-app-bar .region {\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-orient: horizontal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-grid-row-align: center;\n        align-items: center;\n        -webkit-align-content: center;\n        align-content: center;\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n        justify-content: flex-start;\n    }\n\n    #region__left, \n    #region__right {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1 1 30%;\n        flex: 1 1 30%;\n        box-sizing: border-box;\n        max-width: 30%;\n    }\n\n    #myuw-app-bar #region__right {\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        justify-content: flex-end;\n    }\n\n    #slot__navigation,\n    #slot__help,\n    #slot__notifications,\n    #slot__profile {\n        margin: 0;\n    }\n\n    #myuw-app-bar #region__center {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        flex: auto;\n        margin: 0 24px;\n        -webkit-justify-content: center;\n        justify-content: center;\n    }\n\n    #title {\n        height: 100%;\n        display: flex;\n        align-items: center;\n        margin-left: 8px;\n    }\n\n    #myuw-app-bar__title {\n        font-size:  var(--myuw-app-bar-title-font-size, 18px);\n        font-weight: 500;\n        margin: 0 auto;\n    }\n\n    #myuw-app-bar__title #themeText {\n        font-weight: var(--theme-name-font-weight, 600);\n    }\n\n    #myuw-app-bar__title a {\n        text-decoration: none;\n        color: inherit;\n    }\n\n    #myuw-app-bar__title a:hover,\n    #myuw-app-bar__title a:visited, {\n            text-decoration: none;\n            cursor: pointer;\n            color: inherit;\n    }\n    @media (max-width: 600px) {\n        #myuw-app-bar #region__left {\n            flex: auto;\n            max-width: none;\n        }\n        #myuw-app-bar #region__center {\n            max-width: 42px;\n            margin: 0;\n            justify-content: flex-end;\n        }\n        #myuw-app-bar #region__right {\n            flex: 0;\n            max-width: 50%;\n            justify-content: flex-end;\n        }\n    } </style> <div id=\"myuw-app-bar\" class=\"myuw-app-bar\"> <div class=\"region\" id=\"region__left\"> <div class=\"slot\" id=\"slot__navigation\"> <slot id=\"navigation-slot\" name=\"myuw-navigation\"> </div> <div id=\"title\"> <h1 id=\"myuw-app-bar__title\"></h1> </div> </div> <div class=\"region\" id=\"region__center\"> <slot id=\"search-slot\" name=\"myuw-search\"> </div> <div class=\"region\" id=\"region__right\"> <div class=\"slot\" id=\"slot__help\"> <slot id=\"help-slot\" name=\"myuw-help\"> </div> <div class=\"slot\" id=\"slot__notifications\"> <slot id=\"notifications-slot\" name=\"myuw-notifications\"> </div> <div class=\"slot\" id=\"slot__profile\"> <slot id=\"profile-slot\" name=\"myuw-profile\"> </div> </div> </div> ";

class MyUWAppBar extends HTMLElement {

    constructor() {
        super();

        // Create a shadowroot for this element
        this.attachShadow({mode: 'open'});

        // Append the custom HTML to the shadowroot
        this.shadowRoot.appendChild(MyUWAppBar.template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return [
            'app-url',
            'app-name',
            'theme-name'
        ];
    }

    /**
     *  Web component lifecycle hook to update changed properties
     *   - Called each time an attribute is changed, including on the initial load,
     *     so will fire once for each attribute on first load
     * @param {String} name The name of the attribute (e.g. "app-url")
     * @param {String} oldValue The previous value of the attribute
     * @param {String} newValue The new value for that attribute (e.g. "Time Reporting")
     */
    attributeChangedCallback(name, oldValue, newValue) {
        // Update the attribute internally
        
        this[name] = newValue;

        switch (name) {
            case 'theme-name':
                var container = this.shadowRoot.getElementById('themeText');
                if (container) {
                    container.innerText = newValue;
                }
            case 'app-name':
                var container = this['app-text'];
                if (container) {
                    container.innerText = newValue;
                }
            case 'app-url':
                this.updateTitle();
        }
    }

    /**
    *   When component is first attached to the DOM,
    *   get its defined attributes and listen for
    *   scrolling
    */
    connectedCallback() {
        // Fall back on "theme-url" to support older implementations
        this['app-url']     = this.getAttribute('app-url') || this.getAttribute('theme-url');
        this['app-name']    = this.getAttribute('app-name') || 'Hello World';
        this['theme-name']  = this.getAttribute('theme-name');

        // Set the title on initial load
        this.updateTitle();

        // Attach scroll listener
        window.addEventListener('scroll', e => {
            if (window.scrollY !== 0) {
                this.shadowRoot.getElementById('myuw-app-bar').classList.add('shadow');
            } else {
                this.shadowRoot.getElementById('myuw-app-bar').classList.remove('shadow');
            }
        });
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
     * Remove existing child node and replace it with newly-built title HTML
     */
    updateTitle() {
        var appBarTitle = this.shadowRoot.getElementById('myuw-app-bar__title');
        if (appBarTitle.childNodes[0]) {
            appBarTitle.replaceChild(this.buildTitle(), appBarTitle.childNodes[0]);    
        } else {
            appBarTitle.appendChild(this.buildTitle());
        }
    }

    /**
    *   Create the title HTML element based on
    *   which properties exist.
    *   @return {HTMLElement} title An HTML element to use within the app bar title slot
    */
    buildTitle() {
        var title = HTMLElement;

        // Create element for theme name text
        var themeText = document.createElement('span');
        themeText.setAttribute('id', 'themeText');
        themeText.innerText = this['theme-name'] ? this['theme-name'] + ' ' : '';

        // Create element for app name text
        var appText = document.createElement('span');
        appText.setAttribute('id', 'appText');
        appText.innerText = this['app-name'] ? this['app-name'] : '';

        // Create containing element depending on whether url is present
        if (this['app-url'] && this['app-url'] !== null) {
            title = document.createElement('a');
            title.setAttribute('target', '_self');
            title.setAttribute('href', this['app-url']);
        } else {
            title = document.createElement('div');
            title.setAttribute('tabindex', '0');
        }

        title.appendChild(themeText);
        title.appendChild(appText);

        return title;
    }
}

MyUWAppBar.template = (function template(src) {
  const template = (document.createElement('template'));
  template.innerHTML = src;
  return template;
})(tpl);

window.customElements.define('myuw-app-bar', MyUWAppBar);

export { MyUWAppBar };
