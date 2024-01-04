//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function HiddenInput(name : string, value : string, attributes? : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "hidden-input",
			type: "hidden",
			name,
			value,

			...attributes,
		});
}