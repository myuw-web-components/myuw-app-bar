# `<myuw-app-bar>`

A material top app bar designed for use with other MyUW web components

## Getting Started

Add the following import to your page's `<head>`:

```html
<script type="module" src="https://unpkg.com/@myuw-web-components/myuw-app-bar@^1?module"></script>
<script nomodule scr="https://unpkg.com/@myuw-web-components/myuw-app-bar@^1"></script>
```

**Important**: For responsiveness to many screen sizes, ensure you have included the viewport meta tag in your application:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Use the component's HTML tag wherever you want:

```HTML
<myuw-app-bar
    theme-name="MyUW"
    app-name=""
    app-url=""
>
</myuw-app-bar>
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
    --myuw-app-bar-font-weight: 400;
    --theme-text-font-weight: 600;
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
- **myuw-help**: Insert the `<myuw-help-and-feedback>` component
- **myuw-notifications**:  Insert the `<myuw-notifications>` component
- **myuw-profile**: Insert the `<myuw-profile>` component
- **myuw-search**: Insert the `<myuw-search>` component

## Development and contribution

To run the demo app locally and test the component, run the following commands:

```bash
$ npm install
$ npm start
```