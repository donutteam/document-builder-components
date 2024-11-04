//
// Imports
//

import { AElementAttributes, ButtonElementAttributes, Child, DE } from "@donutteam/document-builder";

//
// Component
//

export type ButtonOptions =
(
	{
		attributes?: AElementAttributes;
		external?: boolean;
		href: string;
		searchParams?: URLSearchParams;
		target?: string;
	} |
	{
		attributes?: ButtonElementAttributes;
		type?: "button" | "submit" | "reset";
	}
) &
{
	iconFixedWidth?: boolean;
	iconName?: string;
	iconPosition?: "before" | "after";
	text?: Child;
};

export function Button(options: ButtonOptions)
{
	//
	// Choose Tag Name
	//

	const tagName = "href" in options ? "a" : "button";

	//
	// Build Attributes
	//

	const attributes: typeof options["attributes"] =
	{
		...options.attributes,
	};

	attributes.class = "component-button";

	if ("href" in options)
	{
		attributes.href = options.href;

		if (options.searchParams != null)
		{
			const searchParams = new URLSearchParams(options.searchParams);

			attributes.href += "?" + searchParams.toString();
		}

		attributes.target = options.target ?? (options.external ? "_blank" : "_self");
	}
	else
	{
		attributes.type = options.type ?? "button";
	}

	//
	// Build Children
	//

	const children: Child[] = [];

	if (options.text != null)
	{
		children.push(new DE("span", "text", options.text));
	}

	if (options.iconName != null)
	{
		const cssClasses : string[] = [];

		cssClasses.push("icon");

		cssClasses.push(options.iconName);

		if (options.iconFixedWidth)
		{
			cssClasses.push("fa-fw");
		}

		const icon = new DE("span",
			{
				class: cssClasses.join(" "),
			});

		const iconPosition = options.iconPosition ?? "before";

		if (iconPosition == "before")
		{
			children.unshift(icon);
		}
		else if (iconPosition == "after")
		{
			children.push(icon);
		}
	}

	if ("href" in options && options.external)
	{
		children.push(new DE("span", "external fa-light fa-arrow-up-right-from-square"));
	}

	//
	// Build Button
	//

	return new DE(tagName, attributes, children);
}

export type ButtonGroupType = "left-aligned-group" | "center-aligned-group" | "right-aligned-group" | "left-aligned-list" | "center-aligned-list";

export type ButtonGroupOptions =
{
	className?: string;
	type?: ButtonGroupType;
};

export function ButtonGroup(buttons: (ButtonOptions | null)[]): DE;
export function ButtonGroup(options: ButtonGroupOptions, buttons: (ButtonOptions | null)[]): DE;
export function ButtonGroup(optionsOrButtons: ButtonGroupOptions  | (ButtonOptions | null)[], buttons?: (ButtonOptions | null)[]): DE | null
{
	let options: ButtonGroupOptions;

	if (Array.isArray(optionsOrButtons))
	{
		buttons = optionsOrButtons;
		options = 
		{
			type: "left-aligned-group",
		};
	}
	else
	{
		buttons = buttons!;
		options = optionsOrButtons;
	}

	const type = options.type ?? "left-aligned-group";

	const nonNullButtons = buttons.filter((button) => button != null);

	if (nonNullButtons.length == 0)
	{
		return null;
	}

	return new DE("div", "component-button-group " + type, nonNullButtons.map((buttonOptions) => Button(buttonOptions as ButtonOptions)));
}