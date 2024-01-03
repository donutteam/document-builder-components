//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormTextInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "component-form-text-input",
			type: "text",

			...attributes,
		});
}