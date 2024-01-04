# Changelog
## 6.0.3
Fixing a bunch of class names I fucked up even worse than before. :')

## 6.0.2
Fixing a bunch of class names I thought I had fixed before.

## 6.0.1
Fixing a mistake where the ColorInput mixin used var instead of taking an argument.

## 6.0.0

* Renamed `FormNoticeContainer` to `NoticeContainer`.
* Added `Fieldset` component.
* Added `CheckboxInput` component.
* Added `RadioInput` component.
* Added `EmailInput` component.
* Added `TextInput` component.
* Added `NumberInput` component.
* Added `Label` component.
* Added `HiddenInput` component.
* Added `PasswordInput` component.
* Added `Select` component.
* Added `SelectOption` component.
* Added `SelectOptionGroup` component.
* Added `TextArea` component.
* Added `ColorInput` component.
* Added `DateInput` component.
* Added `FileInput` component.

## 5.1.0
Added `NotNullOrFallback` component.

## 5.0.1
Web browsers are actually the worst.

## 5.0.0

* Changing `Notice` to take a `NoticeOptions` object instead of separate arguments.
* Added `Form` component.
* Added `FormNoticeContainer` component.

## 4.1.1
Fixed a mistake with the `AutomaticGridTemplateColumns` mixin where the width was hardcoded to 200px.

## 4.1.0
Added `AutomaticGridTemplateColumns` mixin.

## 4.0.2
Fixed a serious oversight in the HumanRelativeTime initialisation function.

## 4.0.1
Tweaks to client initialisation functions.

## 4.0.0
Updating client code to specify initialisation functions that must be called by the consumer.

This is to facilitate initialising *new* elements when required by the consumer, such as AJAX loaded content.

## 3.0.0
To simplify issues with the last three patches and allow more flexibility, some breaking changes have been made:

* The `HumanDateTime` component's relative time functionality has been moved into a new `HumanRelativeTime` component.
	* The client side code has been simplified substantially as a result of this change.
* The `dateTimeFormat` argument now defaults to Luxon's `DATETIME_MED` constant.

## 2.2.3
Now casts the decoded `dateTimeFormat` in the client.

## 2.2.2
Fixed a mistake with the previous change.

## 2.2.1
Fixed an oversight where the client code for `HumanDateTime` did not use the new `dateTimeFormat` option.

## 2.2.0

* Added `AppleTouchIcon` component.
* Added `ICOFavicon` component.
* Added `ImageFavicon` component.
* Added `Meta` component.
* Added `OpenGraph` component.
* Added `Preload` component.
* Added `Script` component.
* Added `ServerInjectedGlobals` component.
* Added `Stylesheet` components.

## 2.1.1
Fixed a mistake where `dateTimeFormat` was required.

## 2.1.0

* Updating packages.
* Added `dateTimeFormat` option to `HumanDateTime`.
* Deprecated `showDate` and `showTime` options of `HumanDateTime`.
	* They will be removed in the next major version.
	* They still work for now unless `dateTimeFormat` is also specified, which overrides them.

## 2.0.0

* Exposing all colors as arguments to mixins to facilitate theming.
* Changing all component functions to always return a DE.
	* This makes it always possible to call `renderToString()` on a component, even if it's empty.

## 1.12.3
Tightening return type of the `Paragraph` component.

## 1.12.2
Fixed a bug where the default value of `target` for the `Anchor` component was set to "self" and not "_self".

## 1.12.1
Made it so passing `null` to a `Paragraph` component will render nothing.

## 1.12.0
Added `Paragraph` component.

## 1.11.0
Added optional `extraAttributes` argument to the `Anchor` component.

## 1.10.0
Added `Anchor` component.

## 1.9.0
Added `NotEmptyOrFallback` component.

## 1.8.2
Fixed `ButtonCenterAlignedList` class name.

## 1.8.1
Fixed the border radius of `Notice` components.

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
Fixed a spacing issue when using `showRelativeTime` on a `HumanDateTime` instance.

## 1.6.0

* Added `HumanDateTime` component.
* Added `HumanDateTimeOptions` interface.
* Removed `@types/node` dev dependency.
	* Nothing actually used it.

## 1.5.2
Fixed an oversight with the way SCSS variables interact with Custom Properties.

## 1.5.1
Fixed the type of `widthRems` on `ContentWrapperCustomWidth`.

## 1.5.0

* Improved `ConditionalTopBottomMargin` mixin.
* Added `ContentWrapper` and `ContentWrapperCustomWidth` components.

## 1.4.0

* Added `Breadcrumbs` and `BreadcrumbsItem` components.
* Added `BreadcrumbsItemOptions` interface.
* Added `Notice` component.
* Added `NoticeType` type.

## 1.3.2
Fixed an oversight where the `Header` component and `HeaderLevel` type were not exported.

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