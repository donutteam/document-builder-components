//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export function ContentWrapper(children : Child) : DE
{
	return new DE("div", "component-content-wrapper",
		[
			new DE("div", null, children),
		]);
}

export function ContentWrapperCustomWidth(widthRems : number, children : Child) : DE
{
	return new DE("div",
		{
			class: "component-content-wrapper",

			style: `--width: ${ widthRems }rem;`,
		},
		[
			new DE("div", null, children),
		]);
};