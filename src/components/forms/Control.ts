//
// Imports
//

import { Child, DE, InputElementAttributes, OptionElementAttributes, SelectElementAttributes, TextareaElementAttributes } from "@donutteam/document-builder";

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
// Exports
//

export type ControlSelectOptionTuple = [ number | string ] | [ number | string, number | string ] | [ number | string, number | string, OptionElementAttributes ];

export type ControlSelectOptionGroup =
{
	label: string;
	options: (ControlSelectOptionTuple | null)[];
};

export type ControlOptions =
	{
		type: "date" | "email" | "number" | "password" | "text" | "url";
		name: string;
		value?: number | string | null;

		extraAttributes?: InputElementAttributes;
	} |
	{
		type: "file",
		name: number | string;

		extraAttributes?: InputElementAttributes;
	} |
	{
		type: "select";
		name: string;
		value?: number | string | null;
		options: (ControlSelectOptionTuple | ControlSelectOptionGroup | null)[];

		extraAttributes?: SelectElementAttributes;
	} |
	{
		type: "textarea";
		name: string;
		content?: Child;

		extraAttributes?: TextareaElementAttributes;
	};

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