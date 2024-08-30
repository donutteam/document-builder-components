//
// Imports
//

import { DE } from "@donutteam/document-builder";
import { DateTime } from "luxon";

//
// Component
//

export function HumanRelativeTime(timestampSeconds: number)
{
	return new DE("span",
		{
			class: "component-human-relative-time",

			"data-timestamp-seconds": timestampSeconds,
		},
		[
			DateTime
				.fromSeconds(timestampSeconds, { zone: "UTC" })
				.toRelative(),
		]);
}