//
// Imports
//

import { Child, DE, ElementAttributes } from "@donutteam/document-builder";

import { HiddenInput } from "./HiddenInput.js";

//
// Exports
//

export type NoProtectionOptions =
{
	type: "none";
};

export type RecaptchaProtectionOptions =
{
	type: "recaptcha";
	siteKey: string;
};

export type FormOptions =
{
	className?: string;

	method?: "get" | "GET" | "post" | "POST" | "dialog" | "DIALOG";
	action?: string;

	autoComplete?: boolean; 
	encodingType?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

	manuallyInitialize?: boolean;
	maxFileSize?: number;
	noticeContainerSelector?: string;

	protection?: NoProtectionOptions | RecaptchaProtectionOptions;

	hiddenInputs?: Record<string, string>;

	extraAttributes?: ElementAttributes;
};

export function Form(options: FormOptions, children : Child) : DE
{
	let className = "component-form";

	if (options.className != null)
	{
		className += " " + options.className;
	}

	const method = options.method ?? "get";

	const action = options.action ?? "";

	const autoComplete = options.autoComplete ?? true;

	const encodingType = options.encodingType ?? "application/x-www-form-urlencoded";

	const manuallyInitialize = options.manuallyInitialize ?? false;

	const maxFileSize = options.maxFileSize ?? -1;

	const protection = options.protection ?? { type: "none" };

	const protectionAttributes: Record<string, string> = {};

	switch (protection.type)
	{
		case "none":
		{
			protectionAttributes["data-protected-by"] = protection.type;

			break;
		}

		case "recaptcha":
		{
			protectionAttributes["data-protected-by"] = protection.type;
			protectionAttributes["data-recaptcha-site-key"] = protection.siteKey;

			break;
		}
	}

	const hiddenInputs = options.hiddenInputs ?? {};

	return new DE("form",
		{
			"class": className,

			"method": method,
			"action": action,
			"autocomplete": autoComplete ? "on" : "off",
			"enctype": encodingType,

			"data-manually-initialize": manuallyInitialize,
			"data-max-file-size": maxFileSize,
			"data-notice-container-selector": options.noticeContainerSelector ?? ".notice-container",

			...protectionAttributes,

			...options.extraAttributes,
		},
		[
			new DE("div", "hidden",
				[
					Object.entries(hiddenInputs).map(
						([ name, value ]) =>
						{
							return HiddenInput(name, value);
						}),
				]),

			new DE("div", "inputs", children),
		]);
}