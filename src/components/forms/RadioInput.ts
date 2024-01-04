//
// Imports
//

import { Child, DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function RadioInput(attributes : InputElementAttributes, labelChild : Child) : DE
{
	return new DE("label", "radio-input",
		[
			new DE("input",
				{
					type: "radio",

					...attributes,
				}),

			new DE("div", null,
				[
					labelChild,
				]),
		]);
}