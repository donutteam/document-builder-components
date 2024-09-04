//
// Imports
//

import { Child, DE, InputElementAttributes, OptionElementAttributes, SelectElementAttributes, TextareaElementAttributes } from "@donutteam/document-builder";

//
// Locals
//

type SelectOptionTuple = [ string, string ] | [ string, string, OptionElementAttributes ];

type SelectOptionGroup =
{
	label: string;
	options: SelectOptionTuple[];
};

function SelectOption([ value, text, extraAttributes ]: SelectOptionTuple, currentValue?: string)
{
	return new DE("option", 
		{
			value,
			selected: value == currentValue ? true : null,

			...extraAttributes,
		},
		text);
}

//
// Exports
//

export type InputOptions =
	{
		type: "date" | "email" | "number" | "password" | "text";
		value?: string;

		extraAttributes?: InputElementAttributes;
	} |
	{
		type: "file",

		extraAttributes?: InputElementAttributes;
	} |
	{
		type: "select";
		value?: string;
		options: (SelectOptionTuple | SelectOptionGroup)[];

		extraAttributes?: SelectElementAttributes;
	} |
	{
		type: "textarea";
		content?: Child;

		extraAttributes?: TextareaElementAttributes;
	};

export function Input(options: InputOptions): DE
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
				if (Array.isArray(optionTupleOrOptionGroup))
				{
					return SelectOption(optionTupleOrOptionGroup, options.value);
				}
				else
				{
					return new DE("optgroup", 
						{ 
							label: optionTupleOrOptionGroup.label 
						}, 
						optionTupleOrOptionGroup.options.map((optionTuple) => SelectOption(optionTuple, options.value)));
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
			class: "component-input",
			
			"data-type": options.type,
		},
		[
			new DE(tagName,
				{
					class: "input",
					type: options.type != "select" && options.type != "textarea" ? options.type : null,
					value: "value" in options && options.type != "select" ? options.value : null,
		
					...options.extraAttributes,
				},
				children),

			overlay,
		]);
}