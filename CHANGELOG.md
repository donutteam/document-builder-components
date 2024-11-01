# Changelog
## 16.0.0

- chore: updated dependencies
- chore: removed .idea folder
- refactor: simplified tsconfig

## 15.3.3

* Improved the `Form` component's client logic for scrolling the notice container into view.

## 15.3.2

* Fixed `noPadding` CSS for the `Block` component.

## 15.3.1

* Added padding to controls when there's an overlay so it doesn't overlap the text.

## 15.3.0

* Added `noMargin` option for blocks. They also now automatically have no margins if within a `BlockGroup`.

## 15.2.0

* Support for specifying an `href` on a block to make it an anchor.
* Added the `$outlineColor` parameter to the `Block` component's styles which is used when the block is an anchor.

## 15.1.1

* Made the `Form` client code scroll to the notice container after submission.

## 15.1.0

* Added `extraAttributes` option to `BlockOptions`.

## 15.0.1

* Fixed a bug where null options in a group incorrectly got passed to the internal `Option` component, causing an error.

## 15.0.0

* Made the `handleSubmission` argument of `initialiseForm` optional.
* Renamed the `CheckboxInput` component to `Checkbox`. It also takes different options now.
* Removed the `ColorInput` component.
* Removed the `DateInput` component.
* Removed the `EmailInput` component.
* Removed the `Fieldset` component.
* Removed the `FileInput` component.
* Removed the `NumberInput` component.
* Removed the `PasswordInput` component.
* Removed the `RadioInput` component.
* Removed the `Select`, `SelectOption` and `SelectOptionGroup` components.
* Removed the `TextArea` component.
* Removed the `TextInput` component.
* Added the `Control` component. This is a generic input component that can be used to create several types of inputs.
* Added an optional options object to the `Block` component.
* Removed `BlockWithoutPadding` component.
* Changed options for the `Button` component.
* Combined `ButtonCenterAlignedList`, `ButtonList` and `ButtonRightAlignedGroup` into `ButtonGroup`.
* Made the first argument of `ContentWrapper` optional.
* Removed `searchParametersPageKey` from the `Pagination` component.

## 14.0.1

* Fixed a bug where reCAPTCHA would not get loaded if the only form(s) that required it were set to be manually initialised.

## 14.0.0

* Changed both `HumanDateTime` and `HumanRelativeTime` to take the timestamp as the first arguments.
	* Options for `HumanDateTime` are now the second argument.
* The previously internal `initializeHumanDateTime` and `initializeHumanRelativeTime` functions are now exported.
* Removed a few empty CSS files for components that have no styles.
* Changed the `ContentWrapper` component to take an options object as its first argument.
	* Also removed the `ContentWrapperCustomWidth` component.

## 13.0.4

* The `Breadcrumbs` component now allows any type of `Child` for the `text` option instead of just `string`.

## 13.0.3

* Updated `Form` client to find the notice container by ascending the DOM tree from the form element.

## 13.0.2

* Fixed a bug where the `Form` client was not clearing the notice container after submission.

## 13.0.1

* Updated `Form` client to use `createNotice`.

## 13.0.0

* Once again changed the return type of `HandleSubmission` to an object with two properties:
	* `restoreInputs`: Whether to re-enable and restore the state of submission inputs.
	* `notices`: An array of `NoticeOptions` to display. Optional.

## 12.0.0

* Made the `Form` component take a `noticeContainerSelector` attribute.
	* The client code will now query within the form for this element.
	* If no element is found, it will query the entire document.
	* If no element is found still, **it will throw an error**.

## 11.0.0

* Changed it so the `HandleSubmission` type is expected to return an array of `NoticeOptions`.
* Removed the `FormError` type in favor of the above change.

## 10.0.1

* Fixed a mistake where the `extraAttributes` option was required on the `Form` component.

## 10.0.0

* Added a `className` option to forms. This allows you to add additional class names, making it easier to base components upon the `Form` component.
* Added an `extraAttributes` option to forms. This allows you to define additional custom attributes on the form element.
* Added `event` to the `HandleSubmissionContext` client type. This is the raw `SubmitEvent`.
* Added various logs to `Form` client code. Mostly for my own debugging purposes.
* Removed exports from various internal functions of the `HumanRelativeTime` component.
* Refactored all components to be consistent in design and error handling.

## 9.1.0

* Improved the styling of input components.

## 9.0.0

* Removed `ServerInjectedGlobals` component.
* Major `Form` component refactor, including the ability to set `manuallyInitialise` on a form to initialise it with a custom submission handler while getting all the other benefits of the `Form` component.

## 8.2.0

* Added a `hiddenInputs` option to the `Form` component.

## 8.1.1

* Removed experimental `/client` entrypoint.

## 8.1.0

* Added `createNotice` function to `Notice.client.ts` for easily creating notices client-side.
* Added an experimental `/client` entrypoint.

## 8.0.2

* Made the `Form` component's `method` option accept either capitalized or lowercase strings.

## 8.0.1

* Made the `Form` component's `autoComplete` option default to true.

## 8.0.0

* Removed the `NoticeContainer` component.
* Refactored the `Form` component to greatly streamline it.

## 7.0.1

* Updated packages.
* Updating SCSS to accomodate standards changes.

## 7.0.0

* Changed `ContentWrapperCustomWidth` to take a string for the width instead of a number of rems.

## 6.2.3

* Added `HEADER_LEVEL` constants to the Header component.
* Fixed the "Dismiss" button not being vertically centered.

## 6.2.2

* Made dismissible default to false.
* Added the `roundedCorners` setting which defaults to true.

## 6.2.1

* Fixed a goof in the CSS.

## 6.2.0

* Made it so Notice components can be dismissed by the user.
	* This can be disabled on a per-notice basis by passing `dismissible: false` when creating one.

## 6.1.0

* Added `Table` component.

## 6.0.3

* Fixing a bunch of class names I fucked up even worse than before. :')

## 6.0.2

* Fixing a bunch of class names I thought I had fixed before.

## 6.0.1

* Fixing a mistake where the ColorInput mixin used var instead of taking an argument.

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

* Added `NotNullOrFallback` component.

## 5.0.1

* Web browsers are actually the worst.

## 5.0.0

* Changing `Notice` to take a `NoticeOptions` object instead of separate arguments.
* Added `Form` component.
* Added `FormNoticeContainer` component.

## 4.1.1

* Fixed a mistake with the `AutomaticGridTemplateColumns` mixin where the width was hardcoded to 200px.

## 4.1.0

* Added `AutomaticGridTemplateColumns` mixin.

## 4.0.2

* Fixed a serious oversight in the HumanRelativeTime initialisation function.

## 4.0.1

* Tweaks to client initialisation functions.

## 4.0.0

* Updating client code to specify initialisation functions that must be called by the consumer.
	* This is to facilitate initialising *new* elements when required by the consumer, such as AJAX loaded content.

## 3.0.0

* To simplify issues with the last three patches and allow more flexibility, some breaking changes have been made:
	* The `HumanDateTime` component's relative time functionality has been moved into a new `HumanRelativeTime` component.
		* The client side code has been simplified substantially as a result of this change.
	* The `dateTimeFormat` argument now defaults to Luxon's `DATETIME_MED` constant.

## 2.2.3

* Now casts the decoded `dateTimeFormat` in the client.

## 2.2.2

* Fixed a mistake with the previous change.

## 2.2.1

* Fixed an oversight where the client code for `HumanDateTime` did not use the new `dateTimeFormat` option.

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
* Fixed a mistake where `dateTimeFormat` was required.

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

* Tightening return type of the `Paragraph` component.

## 1.12.2

* Fixed a bug where the default value of `target` for the `Anchor` component was set to "self" and not "_self".

## 1.12.1

* Made it so passing `null` to a `Paragraph` component will render nothing.

## 1.12.0

* Added `Paragraph` component.

## 1.11.0

* Added optional `extraAttributes` argument to the `Anchor` component.

## 1.10.0

* Added `Anchor` component.

## 1.9.0

* Added `NotEmptyOrFallback` component.

## 1.8.2

* Fixed `ButtonCenterAlignedList` class name.

## 1.8.1

* Fixed the border radius of `Notice` components.

## 1.8.0

* Added `BubbleList` component.
* Moved default `Button` colors to `GlobalDefaults.scss`.
* Added `Pagination` component.
* Added `PaginationOptions` interface.

## 1.7.1

* Removing underline from focused/hovered `Button` instances.

## 1.7.0

* Changed the default `$colorCurrent` on `Breadcrumbs` to `blue` from `#0000EE`.
* Added `Button`, `ButtonCenterAlignedList`, `ButtonGroup`, `ButtonList`, and `ButtonRightAlignedGroup` components.
* Added `ButtonOptions` interface.

## 1.6.1

* Fixed a spacing issue when using `showRelativeTime` on a `HumanDateTime` instance.

## 1.6.0

* Added `HumanDateTime` component.
* Added `HumanDateTimeOptions` interface.
* Removed `@types/node` dev dependency.
	* Nothing actually used it.

## 1.5.2

* Fixed an oversight with the way SCSS variables interact with Custom Properties.

## 1.5.1

* Fixed the type of `widthRems` on `ContentWrapperCustomWidth`.

## 1.5.0

* Improved `ConditionalTopBottomMargin` mixin.
* Added `ContentWrapper` and `ContentWrapperCustomWidth` components.

## 1.4.0

* Added `Breadcrumbs` and `BreadcrumbsItem` components.
* Added `BreadcrumbsItemOptions` interface.
* Added `Notice` component.
* Added `NoticeType` type.

## 1.3.2

* Fixed an oversight where the `Header` component and `HeaderLevel` type were not exported.

## 1.3.1

* Added `_GlobalDefaults.scss` to house internal, global variables.
* Changing `Block` and `Header` components to specify a default for margins.
	* I thought my code was valid, but it wasn't, woops.

## 1.3.0

* Changed `Block` mixin to not specify a default for `$margins`.
* Added `Header` component.
* Added `HeaderLevel` type.

## 1.2.0

* Added `BlockGroup` component.

## 1.1.0

* Added `Block` and `BlockWithNoPadding` components.

## 1.0.0

* Initial release.