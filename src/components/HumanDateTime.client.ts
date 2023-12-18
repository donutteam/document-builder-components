//
// Imports
//

import { DateTime } from "luxon";

import { decodeDocumentBuilderEncodedString } from "../functions/decode-document-builder-encoded-string.js";

//
// Component
//

(async () =>
{
	const humanDateTimeElements = Array.from(document.querySelectorAll(".component-human-date-time")) as HTMLTimeElement[];

	for (const humanDateTimeElement of humanDateTimeElements)
	{
		const convertToLocalTime = humanDateTimeElement.dataset["convertToLocalTime"] === "true";

		if (!convertToLocalTime)
		{
			continue;
		}

		const rawDateTimeFormat = humanDateTimeElement.dataset["dateTimeFormat"]!;

		let dateTimeFormat : Intl.DateTimeFormatOptions = {};

		try
		{
			dateTimeFormat = JSON.parse(decodeDocumentBuilderEncodedString(rawDateTimeFormat)) as Intl.DateTimeFormatOptions;
		}
		catch (error)
		{
			console.error(error);

			continue;
		}

		humanDateTimeElement.innerText = DateTime
			.fromISO(humanDateTimeElement.dateTime)
			.toLocaleString(dateTimeFormat);
	}
})();