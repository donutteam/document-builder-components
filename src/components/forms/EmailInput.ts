//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function EmailInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "component-email-input",
			type: "email",

			...attributes,
		});
}