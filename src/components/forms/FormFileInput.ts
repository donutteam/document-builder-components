//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormFileInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "component-form-file-input",
			type: "file",

			...attributes,
		});
}