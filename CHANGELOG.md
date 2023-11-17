# Changelog
## 1.8.0

* Added `BubbleList` component.
* Moved default `Button` colors to `GlobalDefaults.scss`.
* Added `Pagination` component.
* Added `PaginationOptions` interface.

## 1.7.1
Removing underline from focused/hovered `Button` instances.

## 1.7.0

* Changed the default `$colorCurrent` on `Breadcrumbs` to `blue` from `#0000EE`.
* Added `Button`, `ButtonCenterAlignedList`, `ButtonGroup`, `ButtonList`, and `ButtonRightAlignedGroup` components.
* Added `ButtonOptions` interface.

## 1.6.1
Fixing a spacing issue when using `showRelativeTime` on a `HumanDateTime` instance.

## 1.6.0

* Added `HumanDateTime` component.
* Added `HumanDateTimeOptions` interface.
* Removed `@types/node` dev dependency.
	* Nothing actually used it.

## 1.5.2
Fixing an oversight with the way SCSS variables interact with Custom Properties.

## 1.5.1
Fixing the type of `widthRems` on `ContentWrapperCustomWidth`.

## 1.5.0

* Improved `ConditionalTopBottomMargin` mixin.
* Added `ContentWrapper` and `ContentWrapperCustomWidth` components.

## 1.4.0

* Added `Breadcrumbs` and `BreadcrumbsItem` components.
* Added `BreadcrumbsItemOptions` interface.
* Added `Notice` component.
* Added `NoticeType` type.

## 1.3.2
Fixing an oversight where the `Header` component and `HeaderLevel` type were not exported.

## 1.3.1

* Added `_GlobalDefaults.scss` to house internal, global variables.
* Changing `Block` and `Header` components to specify a default for margins.
	* I thought my code was valid, but it wasn't, woops.

## 1.3.0

* Changed `Block` mixin to not specify a default for `$margins`.
* Added `Header` component.
* Added `HeaderLevel` type.

## 1.2.0
Added `BlockGroup` component.

## 1.1.0
Added `Block` and `BlockWithNoPadding` components.

## 1.0.0
Initial release.