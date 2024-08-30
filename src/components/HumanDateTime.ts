//
// Imports
//

import { DE } from "@donutteam/document-builder";
import { DateTime } from "luxon";

//
// Component
//

export type HumanDateTimeOptions =
{
	convertToLocalTime?: boolean;
	dateTimeFormat?: Intl.DateTimeFormatOptions | null;
};

export function HumanDateTime(timestampSeconds: number, options: HumanDateTimeOptions = {})
{
	const convertToLocalTime = options.convertToLocalTime ?? true;

	const dateTimeFormat = options.dateTimeFormat ?? DateTime.DATETIME_MED;

	const dateTime = DateTime.fromSeconds(timestampSeconds,
		{
			zone: "UTC",
		});

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