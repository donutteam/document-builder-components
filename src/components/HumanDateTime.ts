//
// Imports
//

import { DE } from "@donutteam/document-builder";
import { DateTime } from "luxon";
import { z } from "zod";

//
// Component
//

export const HumanDateTimeOptionsSchema = z.object(
	{
		convertToLocalTime: z.boolean().optional(),

		// Note: This is a zod equivilent of Intl.DateTimeFormatOptions
		dateTimeFormat: z.object(
			{
				formatMatcher: z.enum([ "basic", "best fit" ]).optional(),
				dateStyle: z.enum([ "full", "long", "medium", "short" ]).optional(),
				timeStyle: z.enum([ "full", "long", "medium", "short" ]).optional(),
				dayPeriod: z.enum([ "narrow", "short", "long" ]).optional(),
				fractionalSecondDigits: z.union([ z.literal(1), z.literal(2), z.literal(3) ]).optional(),
			}).optional(),
	});

export type HumanDateTimeOptions = z.infer<typeof HumanDateTimeOptionsSchema>;

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