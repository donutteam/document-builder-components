//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function HiddenInput(name: string, value: string, extraAttributes?: InputElementAttributes)
{
	return new DE("input",
		{
			class: "component-hidden-input",
			type: "hidden",
			name,
			value,

			...extraAttributes,
		});
}