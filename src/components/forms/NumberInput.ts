//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function NumberInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "number-input",
			type: "number",

			...attributes,
		});
}