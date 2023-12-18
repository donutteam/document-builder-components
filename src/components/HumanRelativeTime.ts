//
// Imports
//

import { DE } from "@donutteam/document-builder";
import { DateTime } from "luxon";

//
// Component
//

export interface HumanRelativeTimeOptions
{
	timestampSeconds : number;
}

export function HumanRelativeTime(options : HumanRelativeTimeOptions) : DE
{
	//
	// Build Component
	//

	return new DE("span",
		{
			class: "component-human-relative-time",
		},
		[
			DateTime
				.fromSeconds(options.timestampSeconds, { zone: "UTC" })
				.toRelative(),
		]);
}