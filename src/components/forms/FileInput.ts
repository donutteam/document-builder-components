//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FileInput(attributes : InputElementAttributes) : DE
{
	return new DE("input",
		{
			class: "component-file-input",
			type: "file",

			...attributes,
		});
}