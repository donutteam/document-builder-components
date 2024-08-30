//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export type ContentWrapperOptions =
{
	className?: string;
	width?: string;
};

export function ContentWrapper(options: ContentWrapperOptions | null, children: Child)
{
	options = options ?? {};

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