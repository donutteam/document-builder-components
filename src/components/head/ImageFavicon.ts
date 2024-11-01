//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Component
//

export function ImageFavicon(getHref: () => string, sizes = "16x16")
{
	return new DE("link",
		{
			rel: "icon",
			type: "image/png",
			sizes,
			get href()
			{
				return getHref();
			},
		});
}