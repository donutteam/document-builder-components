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

	console.log("Initialising " + humanDateTimeElements.length + " HumanDateTime elements...");

	for (const humanDateTimeElement of humanDateTimeElements)
	{
		humanDateTimeElement.classList.add("initialised");

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
		}
		catch (error)
		{
			console.error(error);
		}
	}
}