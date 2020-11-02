## [3.12.2-patch-4] Unreleased
## Changed
- Updated some dependencies
## Removed
- Postinstall.js and chalk dependency
## Fixed
- Some VsButton lint errors
- Fixed another bug on VsButton $nexTick()
- Fixed bug on VsDropDown when event.relatedTarget is null

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
