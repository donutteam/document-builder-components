//
// Imports
//

import { Child, DE, ElementAttributes, ElementAttributesSchema } from "@donutteam/document-builder";
import { z } from "zod";

import { HiddenInput } from "./HiddenInput.js";

//
// Component
//

export const ProtectionOptionsSchema = z.union(
	[
		z.object(
			{
				type: z.literal("none"),
			}),

		z.object(
			{
				type: z.literal("recaptcha"),
				siteKey: z.string(),
			}),
	]);

export type ProtectionOptions = z.infer<typeof ProtectionOptionsSchema>;

export const FormOptionsSchema = z.object(
	{
		className: z.string().optional(),

		method: z.enum([ "get", "GET", "post", "POST", "dialog", "DIALOG" ]).optional(),
		action: z.string().optional(),

		autoComplete: z.boolean().optional(),
		encodingType: z.enum([ "application/x-www-form-urlencoded", "multipart/form-data", "text/plain" ]).optional(),

		manuallyInitialize: z.boolean().optional(),
		maxFileSize: z.number().optional(),
		noticeContainerSelector: z.string().optional(),

		protection: ProtectionOptionsSchema.optional(),

		hiddenInputs: z.record(z.string()).optional(),

		extraAttributes: ElementAttributesSchema.optional(),
	});

export type FormOptions = z.infer<typeof FormOptionsSchema>;

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