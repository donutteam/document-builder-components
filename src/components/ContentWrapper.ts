//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export type ContentWrapperOptions =
{
	className?: string;
	width?: string;
};

export function ContentWrapper(children: Child): DE;
export function ContentWrapper(options: ContentWrapperOptions, children: Child): DE;
export function ContentWrapper(optionsOrChildren: ContentWrapperOptions | Child, children?: Child): DE
{
	let options: ContentWrapperOptions;

	if (children == null)
	{
		options = {};
		children = optionsOrChildren as Child;
	}
	else
	{
		options = optionsOrChildren as ContentWrapperOptions;
	}

	let className = "component-content-wrapper";

	if (options.className != null)
	{
		className += " " + options.className;
	}

	let style = "";

	if (options.width != null)
	{
		style += `--width: ${ options.width };`;
	}

	return new DE("div",
		{
			class: className,
			style,
		},
		[
			new DE("div", null, children),
		]);
}