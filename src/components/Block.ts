//
// Imports
//

import { Child, DE, ElementAttributes } from "@donutteam/document-builder";

//
// Component
//

export type BlockOptions =
{
	className?: string;

	noMargin?: boolean;

	noPadding?: boolean;

	href?: string;

	extraAttributes?: ElementAttributes;
};

export function Block(children: Child): DE;
export function Block(options: BlockOptions, children: Child): DE;
export function Block(optionsOrChildren: BlockOptions | Child, children?: Child): DE
{
	if (children == null)
	{
		return new DE("div", "component-block", optionsOrChildren as Child);
	}
	else
	{
		const options = optionsOrChildren as BlockOptions;

		const tagName = options.href != null ? "a" : "div";

		let className = "component-block";

		if (options.className != null)
		{
			className += " " + options.className;
		}

		if (options.noMargin)
		{
			className += " no-margin";
		}

		if (options.noPadding)
		{
			className += " no-padding";
		}

		return new DE(tagName,
			{
				class: className,

				href: options.href,
				
				...options.extraAttributes,
			}, 
			children);
	}
}

export function BlockGroup(children: Child)
{
	return new DE("div", "component-block-group", children);
}