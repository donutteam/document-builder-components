//
// Imports
//

import { Child, ChildSchema, DE, InputElementAttributesSchema, OptionElementAttributesSchema, SelectElementAttributesSchema, TextareaElementAttributesSchema } from "@donutteam/document-builder";
import { z } from "zod";

//
// Locals
//

function Option([ value, text, extraAttributes ]: ControlSelectOptionTuple, currentValue?: number | string | null)
{
	return new DE("option", 
		{
			value,
			selected: value.toString() == currentValue?.toString() ? true : null,

			...extraAttributes,
		},
		text ?? value);
}

//
// Component
//

export const ControlSelectOptionTupleSchema = z.union(
	[
		z.tuple(
			[ 
				z.union([ z.number(), z.string() ]), 
			]),

		z.tuple(
			[ 
				z.union([ z.number(), z.string() ]), 
				z.union([ z.number(), z.string() ]),
			]),

		z.tuple(
			[ 
				z.union([ z.number(), z.string() ]), 
				z.union([ z.number(), z.string() ]), 
				OptionElementAttributesSchema,
			]),
	]);

export type ControlSelectOptionTuple = z.infer<typeof ControlSelectOptionTupleSchema>;

export const ControlSelectOptionGroupSchema = z.object(
	{
		label: z.string(),
		options: z.array(z.union([ ControlSelectOptionTupleSchema, z.null() ])),
	});

export type ControlSelectOptionGroup = z.infer<typeof ControlSelectOptionGroupSchema>;

export const ControlOptionsSchema = z.union(
	[
		z.object(
			{
				type: z.enum([ "date", "email", "number", "password", "text", "url" ]),
				name: z.string(),
				value: z.union([ z.number(), z.string() ]).nullish(),
				extraAttributes: InputElementAttributesSchema.optional(),
			}),

		z.object(
			{
				type: z.literal("file"),
				name: z.union([ z.number(), z.string() ]),
				extraAttributes: InputElementAttributesSchema.optional(),
			}),

		z.object(
			{
				type: z.literal("select"),
				name: z.string(),
				value: z.union([ z.number(), z.string() ]).nullish(),
				options: z.array(z.union([ ControlSelectOptionTupleSchema, ControlSelectOptionGroupSchema, z.null() ])),
				extraAttributes: SelectElementAttributesSchema.optional(),
			}),

		z.object(
			{
				type: z.literal("textarea"),
				name: z.string(),
				content: ChildSchema.optional(),
				extraAttributes: TextareaElementAttributesSchema.optional(),
			}),
	]);

export type ControlOptions = z.infer<typeof ControlOptionsSchema>;

export function Control(options: ControlOptions)
{
	//
	// Tag Name
	//

	let tagName: string;

	switch (options.type)
	{
		case "select":
			tagName = "select";

			break;

		case "textarea":
			tagName = "textarea";

			break;

		default:
			tagName = "input";

			break;
	}

	//
	// Overlay
	//

	let overlay: Child = null;

	switch (options.type)
	{
		case "password":
		{
			overlay = new DE("div", "overlay",
				[
					new DE("span",
						{
							class: "icon fa-solid fa-eye",
							title: "Show password",
						}),
				]);

			break;
		}

		case "select":
		{
			overlay = new DE("div", "overlay",
				[
					new DE("span",
						{
							class: "icon fa-solid fa-chevron-down",
							title: "Open select",
						}),
				]);

			break;
		}
	}

	//
	// Children ("select" only)
	//

	let children: Child = null;

	if (options.type == "select")
	{
		children = options.options.map(
			(optionTupleOrOptionGroup) =>
			{
				if (optionTupleOrOptionGroup == null)
				{
					return null;
				}

				if (Array.isArray(optionTupleOrOptionGroup))
				{
					return Option(optionTupleOrOptionGroup, options.value);
				}
				else
				{
					return new DE("optgroup", 
						{ 
							label: optionTupleOrOptionGroup.label 
						}, 
						[
							optionTupleOrOptionGroup.options.map(
								(optionTuple) =>
								{
									if (optionTuple == null)
									{
										return null;
									}

									return Option(optionTuple, options.value);
								}),
						]);
				}
			});
	}
	else if (options.type == "textarea")
	{
		children = options.content ?? [];
	}

	//
	// Return
	//

	return new DE("div",
		{
			class: "component-control",
			
			"data-type": options.type,
		},
		[
			new DE(tagName,
				{
					class: "input",
					type: options.type != "select" && options.type != "textarea" ? options.type : null,
					name: options.name,
					value: "value" in options && options.type != "select" ? options.value : null,
		
					...options.extraAttributes,
				},
				children),

			overlay,
		]);
}