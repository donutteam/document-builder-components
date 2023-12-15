//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";
import { DateTime } from "luxon";

//
// Component
//

export interface HumanDateTimeOptions
{
	convertToLocalTime? : boolean;

	dateTimeFormat : Intl.DateTimeFormatOptions | null;

	/** @deprecated */
	showDate? : boolean;

	/** @deprecated */
	showTime? : boolean;

	showRelativeTime? : boolean;

	timestampSeconds : number;
}

export function HumanDateTime(options : HumanDateTimeOptions) : DE
{
	//
	// Default Options
	//

	options.convertToLocalTime ??= true;

	options.dateTimeFormat = options.dateTimeFormat ??
		(
			options.showDate
				? (options.showTime ? DateTime.DATETIME_MED : DateTime.DATE_MED)
				: null
		);

	options.showRelativeTime ??= false;

	//
	// Create DateTime
	//

	const dateTime = DateTime.fromSeconds(options.timestampSeconds,
		{
			zone: "UTC",
		});

	//
	// Build Date
	//

	let date : Child = null;

	if (options.dateTimeFormat != null)
	{
		date = new DE("span", "date-time",
			[
				dateTime.toLocaleString(options.dateTimeFormat),
				" ",
				"UTC",
			]);
	}

	//
	// Build Relative Time
	//

	let relativeTime : Child = null;

	if (options.showRelativeTime)
	{
		relativeTime = new DE("span", "relative-time",
			[
				options.showDate ? "(" : "",
				dateTime.toRelative(),
				options.showDate ? ")" : "",
			]);
	}

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

			"data-convert-to-local-time": options.convertToLocalTime,
			"data-show-date": options.showDate,
			"data-show-time": options.showTime,
			"data-show-relative-time": options.showRelativeTime,
		},
		[
			date,
			options.showDate && options.showRelativeTime ? " " : "",
			relativeTime,
		]);
}