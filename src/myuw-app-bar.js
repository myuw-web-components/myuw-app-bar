import tpl from './myuw-app-bar.html';

export class MyUWAppBar extends HTMLElement {

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
