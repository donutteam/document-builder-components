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
	const updateTimeElements = () =>
	{
		const timeElements = Array.from(document.querySelectorAll("time.component-human-date-time")) as HTMLTimeElement[];

		for (const timeElement of timeElements)
		{
			const rawDateTimeFormat = timeElement.dataset["dateTimeFormat"] ?? null;
			const showDate = timeElement.dataset["showDate"] === "true";
			const showTime = timeElement.dataset["showTime"] === "true";

			let dateTimeFormat : Intl.DateTimeFormatOptions;

			if (rawDateTimeFormat != null)
			{
				try
				{
					dateTimeFormat = JSON.parse(decodeDocumentBuilderEncodedString(rawDateTimeFormat)) as Intl.DateTimeFormatOptions;
				}
				catch (error)
				{
					console.error(error);

					dateTimeFormat = {};
				}
			}
			else
			{
				dateTimeFormat = showTime ? DateTime.DATETIME_MED : DateTime.DATE_MED;
			}

			const convertToLocalTime = timeElement.dataset["convertToLocalTime"] === "true";
			const showRelativeTime = timeElement.dataset["showRelativeTime"] === "true";

			if (convertToLocalTime && showDate)
			{
				const dateTimeElement = timeElement.querySelector(".date-time") as HTMLElement;

				dateTimeElement.innerText = DateTime.fromISO(timeElement.dateTime).toLocaleString(dateTimeFormat);
			}

			if (showRelativeTime)
			{
				const relativeTimeElement = timeElement.querySelector(".relative-time") as HTMLElement;

				const relativeTime = DateTime.fromISO(timeElement.dateTime).toRelative();

				let text = "";
				text += showDate ? "(" : "";
				text += relativeTime;
				text += showDate ? ")" : "";

				if (relativeTimeElement.innerText !== text)
				{
					relativeTimeElement.innerText = text;
				}
			}
		}
	};

	updateTimeElements();

	setInterval(() => updateTimeElements(), 1000);
})();