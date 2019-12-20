var tpl = "<style> #spacer {\n    display: block;\n    height: 64px;\n  }\n\n  #bar {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 64px;\n    background: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n    font-family: var(--myuw-app-bar-font, var( --myuw-font, Arial, sans-serif));\n    font-size: 14px;\n    font-weight: var(--myuw-app-bar-font-weight, 400);\n    -webkit-font-smoothing: antialiased;\n    background-color: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n    color: var(--myuw-app-bar-color, var(--myuw-primary-color, #fff));\n    z-index: var(--z-index, 80);\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    flex-direction: row;\n    padding: 0 16px;\n    transition: box-shadow 0.3s ease-in-out;\n  }\n\n  #bar.shadow {\n    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n  }\n\n  #bar .region {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    align-content: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    justify-content: flex-start;\n  }\n\n  #region__left,\n  #region__right {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    flex: 1 1 30%;\n    box-sizing: border-box;\n    max-width: 30%;\n  }\n\n  #bar #region__right {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    justify-content: flex-end;\n  }\n\n  #slot__navigation,\n  #slot__help,\n  #slot__notifications,\n  #slot__profile {\n    margin: 0;\n  }\n\n  #bar #region__center {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    flex: auto;\n    margin: 0 24px;\n    -webkit-justify-content: center;\n    justify-content: center;\n  }\n\n  #title {\n    font-size:  var(--myuw-app-bar-title-font-size, 18px);\n    font-weight: 500;\n  }\n\n  #title #themeText {\n    font-weight: var(--theme-name-font-weight, 600);\n  }\n\n  #title a {\n    text-decoration: none;\n    color: inherit;\n  }\n\n  #title a:hover,\n  #title a:visited, {\n    text-decoration: none;\n    cursor: pointer;\n    color: inherit;\n  }\n\n  @media (max-width: 600px) {\n    #myuw-app-bar #region__left {\n      flex: auto;\n      max-width: none;\n    }\n    #myuw-app-bar #region__center {\n      max-width: 42px;\n      margin: 0;\n      justify-content: flex-end;\n    }\n    #myuw-app-bar #region__right {\n      flex: 0;\n      max-width: 50%;\n      justify-content: flex-end;\n    }\n  } </style> <div id=\"bar\"> <div class=\"region\" id=\"region__left\"> <div class=\"slot\" id=\"slot__navigation\"> <slot id=\"navigation-slot\" name=\"myuw-navigation\"> </div> <h1 id=\"title\"> <a id=\"app-anchor\" href=\"#\" target=\"_self\"><span id=\"themeText\"></span> <span id=\"appText\"></span></a> </h1> </div> <div class=\"region\" id=\"region__center\"> <slot id=\"search-slot\" name=\"myuw-search\"> </div> <div class=\"region\" id=\"region__right\"> <div class=\"slot\" id=\"slot__help\"> <slot id=\"help-slot\" name=\"myuw-help\"> </div> <div class=\"slot\" id=\"slot__notifications\"> <slot id=\"notifications-slot\" name=\"myuw-notifications\"> </div> <div class=\"slot\" id=\"slot__profile\"> <slot id=\"profile-slot\" name=\"myuw-profile\"> </div> </div> </div> <div id=\"spacer\"></div> ";

class MyUWAppBar extends HTMLElement {

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

export default MyUWAppBar;
