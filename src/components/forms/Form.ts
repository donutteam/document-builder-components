//
// Imports
//

import { Child, DE, ElementAttributes, InputElementAttributes } from "@donutteam/document-builder";

import { HiddenInput } from "./HiddenInput.js";

//
// Component
//

export type FormProtectionOptions =
{
	type: "none";
} |
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

	/** @deprecated */
	noticeContainerSelector?: string;

	protection?: FormProtectionOptions;

	hiddenInputs?: Record<string, string | { value: string, extraAttributes?: InputElementAttributes }>;

	extraAttributes?: ElementAttributes;
};

export function Form(options: FormOptions, children: Child)
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

	const hiddenInputs = options.hiddenInputs ?? {};

	const extraAttributes = options.extraAttributes ?? {};

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

	return new DE("form",
		{
			"class": className,

			"method": method,
			"action": action,
			"autocomplete": autoComplete ? "on" : "off",
			"enctype": encodingType,

			"data-manually-initialize": manuallyInitialize,
			"data-max-file-size": maxFileSize,

			...protectionAttributes,

			...extraAttributes,
		},
		[
			new DE("div", "hidden-container",
				[
					Object.entries(hiddenInputs).map(
						([ name, value ]) =>
						{
							return typeof value == "string"
								? HiddenInput(name, value)
								: HiddenInput(name, value.value, value.extraAttributes);
						}),
				]),

			new DE("div", "notice-container"),

			new DE("div", "input-container", children),
		]);
}