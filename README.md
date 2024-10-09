# `<myuw-app-bar>`
**`myuw-app-bar` is not currently maintained.**

A material top app bar designed for use with other MyUW web components

## Getting Started

Include the component as follows:

```html
<!-- import the module -->
<script type="module" src="https://cdn.my.wisc.edu/@myuw-web-components/myuw-app-bar@latest/myuw-app-bar.min.mjs"></script>

<!-- fallback for browsers without ES2015 module support -->
<script nomodule scr="https://cdn.my.wisc.edu/@myuw-web-components/myuw-app-bar@latest/myuw-app-bar.min.js"></script>

<myuw-app-bar
  theme-name="MyUW"
  app-name=""
  app-url=""
>
</myuw-app-bar>
```

_Note:_ The evergreen "latest" version can be used for convenience, but in production settings it is recommended to use the latest [release version](https://github.com/myuw-web-components/myuw-profile/releases) specifically, and upgrade only after testing!

**Important**: For responsiveness to many screen sizes, ensure you have included the viewport meta tag in your application:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Configurable properties via attributes

- **themeName (theme-name):** Sets the theme/portal name (defaults to "MyUW")
- **appName (app-name):** Sets the app name (e.g. "Bucky Backup")
- **appUrl (app-url):** Sets then URL to go to when user clicks the app title

### Styling the app bar

MyUW app bar exposes custom CSS properties so users can change some of its styles.

- `--myuw-app-bar-bg`: Background color for the app bar
- `--myuw-app-bar-font`: Font stack for the app bar
- `--myuw-app-bar-color`: Font color for the app bar

For more information about CSS variables and how they work with MyUW Web Components, [reference the styles component](https://github.com/myuw-web-components/myuw-app-styles "reference the styles component")

#### How to use custom CSS properties

Add the following selector to your CSS:

```css
myuw-app-bar {
  --myuw-app-bar-bg: #fff;
  --myuw-app-bar-color: #c5050c;
  --myuw-app-bar-font: 'Roboto', sans-serif;
  --myuw-app-bar-title-font-size: 18px;
  --myuw-app-bar-font-weight: 400;
  --theme-text-font-weight: 600;
  --z-index: 56;
}
```

### Configuration / child components

Use the named `<slot>` tags to include child components of the top-app-bar:

```html
<myuw-app-bar>
  <your-navigation-drawer-component slot="myuw-navigation"></your-navigation-drawer-component>
  <your-notifications-component slot="myuw-notifications"></your-notifications-component>
</myuw-app-bar>
```

**Available slots:**
- **myuw-navigation**: Insert the `<myuw-navigation-drawer>` component
- **myuw-feedback**: Insert the `<myuw-feedback>` component
- **myuw-help**: Insert the `<myuw-help>` component
- **myuw-notifications**:  Insert the `<myuw-notifications>` component
- **myuw-profile**: Insert the `<myuw-profile>` component
- **myuw-search**: Insert the `<myuw-search>` component

## Development and contribution

To run the demo app locally and test the component, run the following commands:

```bash
$ npm install
$ npm start
```

Cross-browser testing provided by:<br/>
<a href="https://www.browserstack.com/"><img width="160" src="https://myuw-web-components.github.io/img/Browserstack-logo.svg" alt="BrowserStack"/></a>
