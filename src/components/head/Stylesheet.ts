//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Component
//

export function Stylesheet(getHref: () => string)
{
	return new DE("link",
		{
			rel: "stylesheet",
			type: "text/css",
			get href()
			{
				return getHref();
			},
		});
}