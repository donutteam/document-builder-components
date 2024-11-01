//
// Imports
//

import { Child, DE, ElementAttributesSchema } from "@donutteam/document-builder";
import { z } from "zod";

//
// Component
//

export const BlockOptionsSchema = z.object(
	{
		className: z.string().optional(),
		noMargin: z.boolean().optional(),
		noPadding: z.boolean().optional(),
		href: z.string().optional(),
		extraAttributes: ElementAttributesSchema.optional(),
	});

export type BlockOptions = z.infer<typeof BlockOptionsSchema>;

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