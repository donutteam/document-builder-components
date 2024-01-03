//
// Imports
//

import { Child, DE, TextareaElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormTextArea(attributes : TextareaElementAttributes, children? : Child) : DE
{
	return new DE("textarea",
		{
			class: "component-form-text-area",

			...attributes,
		},
		children);
}