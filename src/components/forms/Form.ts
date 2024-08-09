//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

import { HiddenInput } from "./HiddenInput.js";

//
// Exports
//

export interface NoProtectionOptions
{
	type: "none";
}

export interface RecaptchaProtectionOptions
{
	type: "recaptcha";

	siteKey: string;
}

export interface FormOptions
{
	method?: "get" | "GET" | "post" | "POST" | "dialog" | "DIALOG";

	action?: string;

	autoComplete?: boolean; 

	encodingType?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

	maxFileSize?: number;

	hiddenInputs?: Record<string, string>;

	protection?: NoProtectionOptions | RecaptchaProtectionOptions;
}

export function Form(options: FormOptions, children : Child) : DE
{
	const method = options.method ?? "get";

	const action = options.action ?? "";

	const autoComplete = options.autoComplete ?? true;

	const encodingType = options.encodingType ?? "application/x-www-form-urlencoded";

	const maxFileSize = options.maxFileSize ?? -1;

	const hiddenInputs = options.hiddenInputs ?? {};

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

	return new DE("form",
		{
			"class": "component-form",

			"method": method,
			"action": action,
			"autocomplete": autoComplete ? "on" : "off",
			"enctype": encodingType,

			"data-max-file-size": maxFileSize,
			
			...protectionAttributes,
		},
		[
			new DE("div", "notices"),

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