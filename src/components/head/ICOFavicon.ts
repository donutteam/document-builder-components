//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Exports
//

export function ICOFavicon(getHref: () => string)
{
	return new DE("link",
		{
			rel: "icon",
			type: "image/x-icon",
			get href()
			{
				return getHref();
			},
		});
}