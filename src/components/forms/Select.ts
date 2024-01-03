//
// Imports
//

import { Child, DE, SelectElementAttributes } from "@donutteam/document-builder";

//
// Exports
//


export function Select(attributes : SelectElementAttributes, children : Child) : DE
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

export function SelectOption(value : number | string, text : string, selected = false) : DE
{
	return new DE("option", { value, selected }, text);
}

export function SelectOptionGroup(label : string, children : Child) : DE
{
	return new DE("optgroup", { label }, children);
}