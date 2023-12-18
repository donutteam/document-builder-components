//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Component
//

export type PreloadType = "audio" | "document" | "embed" | "fetch" | "font" |
	"image" | "object" | "script" | "style" | "track" | "worker" | "video";

export function Preload(type : PreloadType, getHref : () => string) : DE
{
	return new DE("link",
		{
			rel: "preload",
			as: type,
			get href()
			{
				return getHref();
			},
		});
}