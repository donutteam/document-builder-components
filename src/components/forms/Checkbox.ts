//
// Imports
//

import { Child, DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Component
//

export type CheckboxOptions =
{
	type?: "checkbox" | "radio",
	name: string,
	checked?: boolean,
	value?: string,
	extraAttributes?: InputElementAttributes,
	label: Child,
};

export function Checkbox(options: CheckboxOptions)
{
	const type = options.type ?? "checkbox";

	return new DE("label",
		{
			class: "component-checkbox",
			
			"data-type": type,
			"data-name": options.name,
			"data-value": options.value,
		},
		[
			new DE("input",
				{
					type,
					name: options.name,
					checked: options.checked,
					value: options.value,

					...options.extraAttributes,
				}),

			new DE("div", null, options.label),
		]);
}