## [3.12.2-patch-5] 19/01/2021
### Fixed
- Fix error `Cannot read property 'getBoundingClientRect' of undefined` on `changePosition()` method of VsSelect
- Fix VsTab error `Error in callback for watcher "value": "TypeError: Cannot read property '2' of undefined"` when updating `value` on parent's `mounted()` (https://github.com/lusaxweb/vuesax/pull/957)
- Fix VsTab error not updating VsTabs `children` when destroying, because v-if or v-for (https://github.com/lusaxweb/vuesax/pull/874)
- Fix VsTable not emiting `@change-page` event when not SST (https://github.com/lusaxweb/vuesax/pull/910)
- Fix SST VsTable pagination bug (https://github.com/lusaxweb/vuesax/pull/920)
### Removed
- Removed `chalk` dependency and `postinstall` NPM script hook
### Changed
- Included `parameters` property on `@cancel` event of VsDialog the same way they are included on `@accept` event (https://github.com/lusaxweb/vuesax/pull/941)
- Updaed `.gitignore`
### Added
- Added `autocomplete` parameter to VsInput
- Added span tag wrapping text for VsDialog component for better styling (https://github.com/lusaxweb/vuesax/pull/935)
- Added `@click`, `@open`, `@close` events for VsCollapseItem (https://github.com/lusaxweb/vuesax/pull/864)

## [3.12.2-patch-4] 06/11/2020
### Fixed
- Fix another VsButton throwing error on $nextTick(), when component does not exist in next tick
- Fix 'cannot read property classList' on VsDropDown when event.relatedTarget is null

## [3.12.2-patch-3] 29/10/2020
### Fixed
- Fix buttons on VsInputNumber

## [3.12.2-patch-2] 29/10/2020
### Fixed
- Fix: set step property on VsInputNumber so it accept decimals

## [3.12.2-patch-1] 29/10/2020
### Fixed
- Fix buttom element in VsUpload with no type="button", triggering submit if inside a form
- Fix VsButton throwing error on $nextTick(), when component does not exist in next tick
- Fix missing content of expandable-data table (https://github.com/lusaxweb/vuesax/pull/931)
- Fix VsSelect open/close at the same time (https://github.com/lusaxweb/vuesax/pull/842)
- Fix VsUpload not working on iOS < 13.7
