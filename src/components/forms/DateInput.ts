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
			class: "component-form-date-input",
			type: "date",

			...attributes,
		});
}