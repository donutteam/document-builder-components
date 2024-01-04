//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function ColorInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "color-input",
			type: "color",

			...attributes,
		});
}