//
// Imports
//

import { Child, DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function CheckboxInput(attributes : InputElementAttributes, labelChild : Child) : DE
{
	return new DE("label", "component-checkbox-input",
		[
			new DE("input",
				{
					type: "checkbox",

					...attributes,
				}),

			new DE("div", null,
				[
					labelChild,
				]),
		]);
}