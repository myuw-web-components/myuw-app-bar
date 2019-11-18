var MyUWAppBar = (function (exports) {
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

  var tpl = "<style> :host([hidden]) {\n        display: none;\n    }\n\n    #myuw-app-bar {\n        position: -webkit-sticky;\n        position: sticky;\n        top: 0;\n        background: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n        font-family: var(--myuw-app-bar-font, var( --myuw-font, Arial, sans-serif));\n        font-size: 14px;\n        font-weight: var(--myuw-app-bar-font-weight, 400);\n        -webkit-font-smoothing: antialiased;\n        background-color: var(--myuw-app-bar-bg, var( --myuw-primary-bg, #c5050c));\n        color: var(--myuw-app-bar-color, var(--myuw-primary-color, #fff));\n        z-index: var(--z-index, 80);\n        width: 100%;\n        height: 64px;\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        padding: 0 16px;\n        margin: 0;\n        transition: box-shadow 0.3s ease-in-out;\n    }\n\n    #myuw-app-bar.shadow {\n        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);\n    }\n\n    #myuw-app-bar .region {\n        box-sizing: border-box;\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        -webkit-box-orient: horizontal;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-grid-row-align: center;\n        align-items: center;\n        -webkit-align-content: center;\n        align-content: center;\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n        justify-content: flex-start;\n    }\n\n    #region__left, \n    #region__right {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1 1 30%;\n        flex: 1 1 30%;\n        box-sizing: border-box;\n        max-width: 30%;\n    }\n\n    #myuw-app-bar #region__right {\n        -webkit-box-pack: end;\n        -webkit-justify-content: flex-end;\n        justify-content: flex-end;\n    }\n\n    #slot__navigation,\n    #slot__help,\n    #slot__notifications,\n    #slot__profile {\n        margin: 0;\n    }\n\n    #myuw-app-bar #region__center {\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: flex;\n        flex: auto;\n        margin: 0 24px;\n        -webkit-justify-content: center;\n        justify-content: center;\n    }\n\n    #title {\n        height: 100%;\n        display: flex;\n        align-items: center;\n        margin-left: 8px;\n    }\n\n    #myuw-app-bar__title {\n        font-size:  var(--myuw-app-bar-title-font-size, 18px);\n        font-weight: 500;\n        margin: 0 auto;\n    }\n\n    #myuw-app-bar__title #themeText {\n        font-weight: var(--theme-name-font-weight, 600);\n    }\n\n    #myuw-app-bar__title a {\n        text-decoration: none;\n        color: inherit;\n    }\n\n    #myuw-app-bar__title a:hover,\n    #myuw-app-bar__title a:visited, {\n            text-decoration: none;\n            cursor: pointer;\n            color: inherit;\n    }\n    @media (max-width: 600px) {\n        #myuw-app-bar #region__left {\n            flex: auto;\n            max-width: none;\n        }\n        #myuw-app-bar #region__center {\n            max-width: 42px;\n            margin: 0;\n            justify-content: flex-end;\n        }\n        #myuw-app-bar #region__right {\n            flex: 0;\n            max-width: 50%;\n            justify-content: flex-end;\n        }\n    } </style> <div id=\"myuw-app-bar\" class=\"myuw-app-bar\"> <div class=\"region\" id=\"region__left\"> <div class=\"slot\" id=\"slot__navigation\"> <slot id=\"navigation-slot\" name=\"myuw-navigation\"> </div> <div id=\"title\"> <h1 id=\"myuw-app-bar__title\"></h1> </div> </div> <div class=\"region\" id=\"region__center\"> <slot id=\"search-slot\" name=\"myuw-search\"> </div> <div class=\"region\" id=\"region__right\"> <div class=\"slot\" id=\"slot__help\"> <slot id=\"help-slot\" name=\"myuw-help\"> </div> <div class=\"slot\" id=\"slot__notifications\"> <slot id=\"notifications-slot\" name=\"myuw-notifications\"> </div> <div class=\"slot\" id=\"slot__profile\"> <slot id=\"profile-slot\" name=\"myuw-profile\"> </div> </div> </div> ";

  var MyUWAppBar =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(MyUWAppBar, _HTMLElement);

    function MyUWAppBar() {
      var _this;

      _classCallCheck(this, MyUWAppBar);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(MyUWAppBar).call(this)); // Create a shadowroot for this element

      _this.attachShadow({
        mode: 'open'
      }); // Append the custom HTML to the shadowroot


      _this.shadowRoot.appendChild(MyUWAppBar.template.content.cloneNode(true));

      return _this;
    }

    _createClass(MyUWAppBar, [{
      key: "attributeChangedCallback",

      /**
       *  Web component lifecycle hook to update changed properties
       *   - Called each time an attribute is changed, including on the initial load,
       *     so will fire once for each attribute on first load
       * @param {String} name The name of the attribute (e.g. "app-url")
       * @param {String} oldValue The previous value of the attribute
       * @param {String} newValue The new value for that attribute (e.g. "Time Reporting")
       */
      value: function attributeChangedCallback(name, oldValue, newValue) {
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

    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        // Fall back on "theme-url" to support older implementations
        this['app-url'] = this.getAttribute('app-url') || this.getAttribute('theme-url');
        this['app-name'] = this.getAttribute('app-name') || 'Hello World';
        this['theme-name'] = this.getAttribute('theme-name'); // Set the title on initial load

        this.updateTitle(); // Attach scroll listener

        window.addEventListener('scroll', function (e) {
          if (window.scrollY !== 0) {
            _this2.shadowRoot.getElementById('myuw-app-bar').classList.add('shadow');
          } else {
            _this2.shadowRoot.getElementById('myuw-app-bar').classList.remove('shadow');
          }
        });
      }
      /**
      *   Clean up event listeners if element is removed from the DOM
      */

    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _this3 = this;

        window.removeEventListener('scroll', function (e) {
          _this3.shadowRoot.getElementById('myuw-app-bar').classList.remove('shadow');
        });
      }
      /**
       * Remove existing child node and replace it with newly-built title HTML
       */

    }, {
      key: "updateTitle",
      value: function updateTitle() {
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

    }, {
      key: "buildTitle",
      value: function buildTitle() {
        var title = HTMLElement; // Create element for theme name text

        var themeText = document.createElement('span');
        themeText.setAttribute('id', 'themeText');
        themeText.innerText = this['theme-name'] ? this['theme-name'] + ' ' : ''; // Create element for app name text

        var appText = document.createElement('span');
        appText.setAttribute('id', 'appText');
        appText.innerText = this['app-name'] ? this['app-name'] : ''; // Create containing element depending on whether url is present

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
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['app-url', 'app-name', 'theme-name'];
      }
    }]);

    return MyUWAppBar;
  }(_wrapNativeSuper(HTMLElement));

  MyUWAppBar.template = function template(src) {
    var template = document.createElement('template');
    template.innerHTML = src;
    return template;
  }(tpl);

  window.customElements.define('myuw-app-bar', MyUWAppBar);

  exports.MyUWAppBar = MyUWAppBar;

  return exports;

}({}));
