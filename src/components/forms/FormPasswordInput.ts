//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Exports
//

export function FormPasswordInput(attributes : InputElementAttributes) : DE
{
	return new DE("div", "component-form-password-input",
		[
			new DE("input",
				{
					type: "password",

					...attributes,
				}),

			new DE("span",
				{
					class: "toggle fa-solid fa-eye fa-fw",
					title: "Show password",
				}),
		]);
}