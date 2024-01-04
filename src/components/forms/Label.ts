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
			class: "label",
			for: forName,
		},
		[
			child,
		]);
}