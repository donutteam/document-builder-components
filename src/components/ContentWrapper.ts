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

export function ContentWrapperCustomWidth(width : string, children : Child) : DE
{
	return new DE("div",
		{
			class: "component-content-wrapper",

			style: `--width: ${ width };`,
		},
		[
			new DE("div", null, children),
		]);
}