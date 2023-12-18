//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Component
//

export function Script(getSrc : () => string, type = "text/javascript") : DE
{
	return new DE("script",
		{
			defer: "",
			type,
			get src()
			{
				return getSrc();
			},
		});
}