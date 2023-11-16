# Changelog
## 1.5.2
Fixing an oversight with the way SCSS variables interact with Custom Properties.

## 1.5.1
Fixing the type of `widthRems` on `ContentWrapperCustomWidth`.

## 1.5.0

* Improved `ConditionalTopBottomMargin` mixin.
* Added `ContentWrapper` and `ContentWrapperCustomWidth` components.

## 1.4.0

* Added `Breadcrumbs` and `BreadcrumbsItem` components.
* Added `Notice` component and `NoticeType` type.

## 1.3.2
Fixing an oversight where the `Header` component and `HeaderLevel` type were not exported.

## 1.3.1

* Added `_GlobalDefaults.scss` to house internal, global variables.
* Changing `Block` and `Header` components to specify a default for margins.
	* I thought my code was valid, but it wasn't, woops.

## 1.3.0

* Changed `Block` mixin to not specify a default for `$margins`.
* Added `Header` component and `HeaderLevel` type.

## 1.2.0
Added `BlockGroup` component.

## 1.1.0
Added `Block` and `BlockWithNoPadding` components.

## 1.0.0
Initial release.