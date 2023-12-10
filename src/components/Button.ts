//
// Imports
//

import { AElementAttributes, ButtonElementAttributes, Child, DE, ElementAttributes } from "@donutteam/document-builder";

//
// Component
//

export interface ButtonOptions
{
	attributes? : ElementAttributes;

	external? : boolean;

	href? : string;

	iconFixedWidth? : boolean;

	iconName? : string;

	iconPosition? : "before" | "after";

	type? : "button" | "submit" | "reset";

	searchParams? : string | URLSearchParams | string[][] | Record<string, string>;

	target? : "_blank" | "_self" | "_parent" | "top" | string;

	text? : Child;
}

export function Button(buttonOptions : ButtonOptions) : DE
{
	//
	// Check Null
	//

	if (buttonOptions == null)
	{
		return new DE(null, null);
	}

	//
	// Default Options
	//

	const isRealButton = buttonOptions.href == null;

	buttonOptions = buttonOptions ?? {};

	buttonOptions.external = buttonOptions.external ?? false;

	buttonOptions.iconFixedWidth = buttonOptions.iconFixedWidth ?? false;

	buttonOptions.iconPosition = buttonOptions.iconPosition ?? "before";

	buttonOptions.type = buttonOptions.type ?? "button";

	buttonOptions.target = buttonOptions.target ?? (buttonOptions.external ? "_blank" : "_self");

	//
	// Choose Tag Name
	//

	const tagName = isRealButton ? "button" : "a";

	//
	// Build Attributes
	//

	const attributes : ButtonElementAttributes | AElementAttributes =
		{
			...buttonOptions.attributes,
		};

	attributes.class = "component-button";

	if (isRealButton)
	{
		attributes.type = buttonOptions.type;
	}
	else
	{
		attributes.href = buttonOptions.href;

		if (buttonOptions.searchParams != null)
		{
			const searchParams = new URLSearchParams(buttonOptions.searchParams);

			attributes.href += "?" + searchParams.toString();
		}

		attributes.target = buttonOptions.target;
	}

	//
	// Build Children
	//

	const children : Child[] = [];

	if (buttonOptions.text != null)
	{
		children.push(new DE("span", "text", buttonOptions.text));
	}

	if (buttonOptions.iconName != null)
	{
		const cssClasses : string[] = [];

		cssClasses.push("icon");

		cssClasses.push(buttonOptions.iconName);

		if (buttonOptions.iconFixedWidth)
		{
			cssClasses.push("fa-fw");
		}

		const icon = new DE("span",
			{
				class: cssClasses.join(" "),
			});

		if (buttonOptions.iconPosition == "before")
		{
			children.unshift(icon);
		}
		else if (buttonOptions.iconPosition == "after")
		{
			children.push(icon);
		}
	}

	if (buttonOptions.external)
	{
		children.push(new DE("span", "external fa-light fa-arrow-up-right-from-square"));
	}

	//
	// Build Button
	//

	return new DE(tagName, attributes, children);
}

export function ButtonCenterAlignedList(buttons : ButtonOptions[]) : DE
{
	if (buttons.length == 0)
	{
		return new DE(null, null);
	}

	return new DE("div", "component-button-list center-aligned", buttons.map(Button));
}

export function ButtonGroup(buttons : ButtonOptions[]) : DE
{
	if (buttons.length == 0)
	{
		return new DE(null, null);
	}

	return new DE("div", "component-button-group", buttons.map(Button));
}

export function ButtonList(buttons : ButtonOptions[]) : DE
{
	if (buttons.length == 0)
	{
		return new DE(null, null);
	}

	return new DE("div", "component-button-list", buttons.map(
		(buttonOptions) =>
		{
			if (buttonOptions != null)
			{
				// Note: Forced on for list buttons because aesthetics
				buttonOptions.iconFixedWidth = true;
			}

			return Button(buttonOptions);
		}));
}

export function ButtonRightAlignedGroup(buttons : ButtonOptions[]) : DE
{
	if (buttons.length == 0)
	{
		return new DE(null, null);
	}

	return new DE("div", "component-button-group right-aligned", buttons.map(Button));
}