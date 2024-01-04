//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export function Label(forName : string | null, child : Child) : DE
{
	return new DE("label",
		{
			class: "component-label",
			for: forName,
		},
		[
			child,
		]);
}