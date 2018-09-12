# myuw-app-bar versions

## 1.5.1

### Changed

* Removed CSS margins on div elements that contains slots so they don't take up space when the slot has no content -- taking the position that margins are the responsibility of the slotted content.

## 1.5.0

### Changed

* Deprecated support for "theme-url" property for better UX. You can still set a theme name and app name, but now the title only supports a single link.

### How to upgrade

If you are using the recommended version (1^), you don't need to do anything special to get these changes. Upgrading to this version will not cause breaking changes. For implementations that use a "theme-url" property and no "app-url" property, the "theme-url" will be used as the title link. For implementations currently using both, the "app-url" will be favored.


