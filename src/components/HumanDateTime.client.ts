//
// Imports
//

import { DateTime } from "luxon";

import { decodeDocumentBuilderEncodedString } from "../functions/decode-document-builder-encoded-string.js";

//
// Component
//

export function initialiseHumanDateTimes()
{
	const humanDateTimeElements = Array.from(document.querySelectorAll(".component-human-date-time:not(.initialised)")) as HTMLTimeElement[];

	for (const humanDateTimeElement of humanDateTimeElements)
	{
		try
		{
			const convertToLocalTime = humanDateTimeElement.dataset["convertToLocalTime"] === "true";

			if (!convertToLocalTime)
			{
				continue;
			}

			const rawDateTimeFormat = humanDateTimeElement.dataset["dateTimeFormat"]!;

			let dateTimeFormat : Intl.DateTimeFormatOptions = {};

			dateTimeFormat = JSON.parse(decodeDocumentBuilderEncodedString(rawDateTimeFormat)) as Intl.DateTimeFormatOptions;

			humanDateTimeElement.innerText = DateTime
				.fromISO(humanDateTimeElement.dateTime)
				.toLocaleString(dateTimeFormat);

			humanDateTimeElement.classList.add("initialised");
		}
		catch (error)
		{
			console.error(error);
		}
	}
}