//
// Imports
//

import { Child, DE, SelectElementAttributes } from "@donutteam/document-builder";

//
// Exports
//


export function FormSelect(attributes : SelectElementAttributes, children : Child) : DE
{
	return new DE("select",
		{
			class: "component-form-select",

			...attributes,
		},
		[
			children,
		]);
}

export function FormSelectOption(value : number | string, text : string, selected = false) : DE
{
	return new DE("option", { value, selected }, text);
}

export function FormSelectOptionGroup(label : string, children : Child) : DE
{
	return new DE("optgroup", { label }, children);
}