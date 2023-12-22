//
// Imports
//

import { Child, DE, FormElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function Form(attributes : FormElementAttributes, children : Child) : DE
{
	return new DE("form",
		{
			class: "component-form",

			...attributes,
		},
		children);
}