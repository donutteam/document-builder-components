//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormEmailInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "component-form-email-input",
			type: "email",

			...attributes,
		});
}