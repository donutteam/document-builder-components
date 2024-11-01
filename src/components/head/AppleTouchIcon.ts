//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Component
//

export function AppleTouchIcon(getHref: () => string, sizes = "180x180")
{
	return new DE("link",
		{
			rel: "apple-touch-icon",
			sizes,
			get href()
			{
				return getHref();
			},
		});
}