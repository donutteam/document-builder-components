//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormHiddenInput(name : string, value : string, attributes? : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "component-form-hidden-input",
			type: "hidden",
			name,
			value,

			...attributes,
		});
}