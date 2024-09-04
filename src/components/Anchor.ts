//
// Imports
//

import { AElementAttributes, Child, DE } from "@donutteam/document-builder";

//
// Component
//

export function Anchor(text: Child, href: string, target = "_self", extraAttributes?: AElementAttributes)
{
	return new DE("a",
		{
			class: "component-anchor",
			href,
			target,
			...extraAttributes,
		},
		[
			text,
		]);
}