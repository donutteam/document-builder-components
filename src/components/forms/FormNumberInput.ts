//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormNumberInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "component-form-number-input",
			type: "number",

			...attributes,
		});
}