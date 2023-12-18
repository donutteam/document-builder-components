//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Exports
//

export function ImageFavicon(getHref : () => string, sizes = "16x16") : DE
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