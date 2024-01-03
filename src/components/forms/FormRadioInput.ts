//
// Imports
//

import { Child, DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormRadioInput(attributes : InputElementAttributes, labelChild : Child) : DE
{
	return new DE("label", "component-form-radio-input",
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