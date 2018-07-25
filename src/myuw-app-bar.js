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

MyUWAppBar.template = (function template(src) {
  const template = (document.createElement('template'));
  template.innerHTML = src;
  return template;
})(tpl);

window.customElements.define('myuw-app-bar', MyUWAppBar);
