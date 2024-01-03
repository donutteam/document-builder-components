//
// Imports
//

import { Child, DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormCheckboxInput(attributes : InputElementAttributes, labelChild : Child) : DE
{
	return new DE("label", "component-form-checkbox-input",
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