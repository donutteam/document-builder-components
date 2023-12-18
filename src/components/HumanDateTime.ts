//
// Imports
//

import { DE } from "@donutteam/document-builder";
import { DateTime } from "luxon";

//
// Component
//

export interface HumanDateTimeOptions
{
	convertToLocalTime? : boolean;

	dateTimeFormat? : Intl.DateTimeFormatOptions | null;

	timestampSeconds : number;
}

export function HumanDateTime(options : HumanDateTimeOptions) : DE
{
	//
	// Options
	//

	const convertToLocalTime = options.convertToLocalTime ?? true;

	const dateTimeFormat = options.dateTimeFormat ?? DateTime.DATETIME_MED;

	const timestampSeconds = options.timestampSeconds;

	//
	// Create DateTime
	//

	const dateTime = DateTime.fromSeconds(timestampSeconds,
		{
			zone: "UTC",
		});

	//
	// Build Component
	//

	return new DE("time",
		{
			class: "component-human-date-time",
			datetime: dateTime.toISO(
				{
					includeOffset: true,
				}),

			"data-convert-to-local-time": convertToLocalTime,
			"data-date-time-format": JSON.stringify(dateTimeFormat),
		},
		[
			dateTime.toLocaleString(dateTimeFormat),
			" ",
			"UTC",
		]);
}