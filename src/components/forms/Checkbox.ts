//
// Imports
//

import { Child, DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export type CheckboxOptions =
{
	type?: "checkbox" | "radio";
	name: string;
	checked?: boolean;
	extraAttributes?: InputElementAttributes;
	label: Child;
};

export function Checkbox(options: CheckboxOptions)
{
	const type = options.type ?? "checkbox";

	return new DE("label", "component-checkbox",
		[
			new DE("input",
				{
					type,
					name: options.name,
					checked: options.checked,

					...options.extraAttributes,
				}),

			new DE("div", null, options.label),
		]);
}