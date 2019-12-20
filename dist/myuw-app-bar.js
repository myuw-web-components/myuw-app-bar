var MyUWAppBar = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var tpl = "<style> #spacer {\n    display: block;\n    height: 64px;\n  }\n\n  #bar {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 64px;\n    background: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n    font-family: var(--myuw-app-bar-font, var( --myuw-font, Arial, sans-serif));\n    font-size: 14px;\n    font-weight: var(--myuw-app-bar-font-weight, 400);\n    -webkit-font-smoothing: antialiased;\n    background-color: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n    color: var(--myuw-app-bar-color, var(--myuw-primary-color, #fff));\n    z-index: var(--z-index, 80);\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    align-items: center;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n    flex-direction: row;\n    padding: 0 16px;\n    transition: box-shadow 0.3s ease-in-out;\n  }\n\n  #bar.shadow {\n    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n  }\n\n  #bar .region {\n    box-sizing: border-box;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n    -ms-grid-row-align: center;\n    align-items: center;\n    -webkit-align-content: center;\n    align-content: center;\n    -webkit-box-pack: start;\n    -webkit-justify-content: flex-start;\n    justify-content: flex-start;\n  }\n\n  #region__left,\n  #region__right {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 1 30%;\n    flex: 1 1 30%;\n    box-sizing: border-box;\n    max-width: 30%;\n  }\n\n  #bar #region__right {\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n    justify-content: flex-end;\n  }\n\n  #slot__navigation,\n  #slot__help,\n  #slot__notifications,\n  #slot__profile {\n    margin: 0;\n  }\n\n  #bar #region__center {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: flex;\n    flex: auto;\n    margin: 0 24px;\n    -webkit-justify-content: center;\n    justify-content: center;\n  }\n\n  #title {\n    font-size:  var(--myuw-app-bar-title-font-size, 18px);\n    font-weight: 500;\n  }\n\n  #title #themeText {\n    font-weight: var(--theme-name-font-weight, 600);\n  }\n\n  #title a {\n    text-decoration: none;\n    color: inherit;\n  }\n\n  #title a:hover,\n  #title a:visited, {\n    text-decoration: none;\n    cursor: pointer;\n    color: inherit;\n  }\n\n  @media (max-width: 600px) {\n    #myuw-app-bar #region__left {\n      flex: auto;\n      max-width: none;\n    }\n    #myuw-app-bar #region__center {\n      max-width: 42px;\n      margin: 0;\n      justify-content: flex-end;\n    }\n    #myuw-app-bar #region__right {\n      flex: 0;\n      max-width: 50%;\n      justify-content: flex-end;\n    }\n  } </style> <div id=\"bar\"> <div class=\"region\" id=\"region__left\"> <div class=\"slot\" id=\"slot__navigation\"> <slot id=\"navigation-slot\" name=\"myuw-navigation\"> </div> <h1 id=\"title\"> <a id=\"app-anchor\" href=\"#\" target=\"_self\"><span id=\"themeText\"></span> <span id=\"appText\"></span></a> </h1> </div> <div class=\"region\" id=\"region__center\"> <slot id=\"search-slot\" name=\"myuw-search\"> </div> <div class=\"region\" id=\"region__right\"> <div class=\"slot\" id=\"slot__help\"> <slot id=\"help-slot\" name=\"myuw-help\"> </div> <div class=\"slot\" id=\"slot__notifications\"> <slot id=\"notifications-slot\" name=\"myuw-notifications\"> </div> <div class=\"slot\" id=\"slot__profile\"> <slot id=\"profile-slot\" name=\"myuw-profile\"> </div> </div> </div> <div id=\"spacer\"></div> ";

  var MyUWAppBar =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(MyUWAppBar, _HTMLElement);

    _createClass(MyUWAppBar, null, [{
      key: "elementName",
      get: function get() {
        return 'myuw-app-bar';
      }
    }, {
      key: "observedAttributes",
      get: function get() {
        return ['app-url', 'app-name', 'theme-name'];
      }
    }, {
      key: "template",
      get: function get() {
        if (this._template === undefined) {
          this._template = document.createElement('template');
          this._template.innerHTML = tpl;
        }

        return this._template;
      }
    }]);

    function MyUWAppBar() {
      var _this;

      _classCallCheck(this, MyUWAppBar);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MyUWAppBar).call(this));

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(_this.constructor.template.content.cloneNode(true));

      _this.appAnchorElement = _this.shadowRoot.getElementById('app-anchor');
      _this.appBarElement = _this.shadowRoot.getElementById('bar');
      _this.appTextElement = _this.shadowRoot.getElementById('appText');
      _this.themeTextElement = _this.shadowRoot.getElementById('themeText');
      _this.eventListeners = [{
        target: window,
        type: 'scroll',
        handler: function handler(event) {
          return _this.handleWindowScroll(event);
        }
      }];
      return _this;
    }

    _createClass(MyUWAppBar, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, oldValue, newValue) {
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
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        this.eventListeners.forEach(function (_ref) {
          var target = _ref.target,
              type = _ref.type,
              handler = _ref.handler;
          return target.addEventListener(type, handler);
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this.eventListeners.forEach(function (_ref2) {
          var target = _ref2.target,
              type = _ref2.type,
              handler = _ref2.handler;
          return target.removeEventListener(type, handler);
        });
      }
    }, {
      key: "handleWindowScroll",
      value: function handleWindowScroll(event) {
        if (window.scrollY !== 0) {
          this.appBarElement.classList.add('shadow');
        } else {
          this.appBarElement.classList.remove('shadow');
        }
      }
    }]);

    return MyUWAppBar;
  }(_wrapNativeSuper(HTMLElement));

  if (customElements.get(MyUWAppBar.elementName) === undefined) {
    customElements.define(MyUWAppBar.elementName, MyUWAppBar);
  }

  return MyUWAppBar;

}());
