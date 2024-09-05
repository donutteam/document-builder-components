//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export type BlockOptions =
{
	className?: string;

	noPadding?: boolean;
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

		let className = "component-block";

		if (options.className != null)
		{
			className += " " + options.className;
		}

		if (options.noPadding)
		{
			className += " no-padding";
		}

		return new DE("div", className, children);
	}
}

export function BlockGroup(children: Child)
{
	return new DE("div", "component-block-group", children);
}