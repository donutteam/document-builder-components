//
// Imports
//

import { DE } from "@donutteam/document-builder";
import { z } from "zod";

//
// Component
//

export const PreloadTypeSchema = z.enum([ "audio", "document", "embed", "fetch", "font", "image", "object", "script", "style", "track", "worker", "video" ]);

export type PreloadType = z.infer<typeof PreloadTypeSchema>;

export function Preload(type: PreloadType, getHref: () => string)
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