# myuw-app-bar versions

## 1.7.6

* Adjust spacing to accommodate new top banner

## 1.7.5

* Implement top banner portion

## 1.7.4

* Update font-weight of page title

## 1.7.3

### Changed

* Remove references to Roboto and Arial fonts and replaced with Red Hat Display and Red Hat Text

## 1.7.2

### Changed

 * Make adjustments to the display of the regions on mobile views

## 1.7.1

### Added

 * Include MyUW Feedback Web Component in the App Bar

## 1.7.0

### Changed

 * Position at top of viewport and fill width
 * Remove CSS from sample page to better show the component itself
 * Add more demo controls for CSS variables
 * Add filler text to demo page, to demo scrolling behavior
 * Clean up, modernize, simplify, and generally restructure everything

## 1.6.0

### Added

* Delivery pipeline, contributor docs

## 1.5.5

### Added

* Exposed a new css property to set the font size of the app bar title (`--myuw-app-bar-title-font-size`). Usage instructions are in the README.

## 1.5.3

### Added

* Exposed a new css property to set the z-index of the top bar (`--z-index`). Usage instructions have been included in the README.

## 1.5.2

### Changed

* Removed CSS margins on div elements that contains slots so they don't take up space when the slot has no content -- taking the position that margins are the responsibility of the slotted content.
* Consume font-weight variables in app bar for theming (`--myuw-app-bar-font-weight` and `--theme-text-font-weight`)

## 1.5.0

### Changed

* Deprecated support for "theme-url" property for better UX. You can still set a theme name and app name, but now the title only supports a single link.

### How to upgrade

If you are using the recommended version (1^), you don't need to do anything special to get these changes. Upgrading to this version will not cause breaking changes. For implementations that use a "theme-url" property and no "app-url" property, the "theme-url" will be used as the title link. For implementations currently using both, the "app-url" will be favored.


