//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export function Anchor(text : Child, href : string, target = "_self") : DE
{
	return new DE("a",
		{
			class: "component-anchor",
			href,
			target,
		},
		[
			text,
		]);
}