//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function DateInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "date-input",
			type: "date",

			...attributes,
		});
}