//
// Imports
//

import { Child, DE, FieldsetElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function Fieldset(attributes : FieldsetElementAttributes, legend : string | null, children : Child) : DE
{
	return new DE("fieldset",
		{
			class: "component-form-fieldset",

			...attributes,
		},
		[
			legend != null ? new DE("legend", null, legend) : null,

			children,
		]);
}