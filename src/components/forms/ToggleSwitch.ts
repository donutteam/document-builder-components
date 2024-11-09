//
// Imports
//

import { DE, InputElementAttributes } from "@donutteam/document-builder";

//
// Component
//

export function ToggleSwitch(name: string, attributes: InputElementAttributes = {})
{
	return new DE("div", "component-toggle-switch",
		[
			new DE("label", null,
				[
					new DE("input", 
						{ 
							type: "checkbox", 
							name: name,
							id: name,
							
							...attributes,
						}),
				]),

			new DE("div", "loading",
				[
					new DE("span", "fa-solid fa-circle-notch fa-spin"),
				]),
		]);
}