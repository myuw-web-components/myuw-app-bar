import tpl from './myuw-app-bar.html';

export default class MyUWAppBar extends HTMLElement {

  static get elementName() {
    return 'myuw-app-bar';
  }

  static get observedAttributes() {
    return [
      'app-url',
      'app-name',
      'theme-name'
    ];
  }

  static get template() {
    if (this._template === undefined) {
      this._template = document.createElement('template');
      this._template.innerHTML = tpl;
    }
    return this._template;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this.constructor.template.content.cloneNode(true));
    this.appAnchorElement = this.shadowRoot.getElementById('app-anchor');
    this.appBarElement = this.shadowRoot.getElementById('bar');
    this.appTextElement = this.shadowRoot.getElementById('appText');
    this.themeTextElement = this.shadowRoot.getElementById('themeText');
    this.eventListeners = [
      { target: window, type: 'scroll', handler: event => this.handleWindowScroll(event) }
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'theme-name':
        this.themeTextElement.textContent = newValue;
        break;
      case 'app-name':
        this.appTextElement.textContent = newValue;
        break;
      case 'app-url':
        this.appAnchorElement.href = newValue;
        break;
    }
  }

  connectedCallback(){
    this.eventListeners.forEach( ({target, type, handler}) => target.addEventListener(type, handler));
  }

  disconnectedCallback(){
    this.eventListeners.forEach( ({target, type, handler}) => target.removeEventListener(type, handler));
  }

  handleWindowScroll(event) {
    if (window.scrollY !== 0) {
      this.appBarElement.classList.add('shadow');
    } else {
      this.appBarElement.classList.remove('shadow');
    }
  }

}

if (customElements.get(MyUWAppBar.elementName) === undefined) {
  customElements.define(MyUWAppBar.elementName, MyUWAppBar);
}
