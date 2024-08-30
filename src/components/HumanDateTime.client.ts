//
// Imports
//

import { DateTime } from "luxon";

import * as StringLib from "../libs/string.js";

//
// Component
//

export function initialiseHumanDateTime(humanDateTime: HTMLTimeElement)
{
	const convertToLocalTime = humanDateTime.dataset["convertToLocalTime"] === "true";

	if (convertToLocalTime)
	{
		const rawDateTimeFormat = humanDateTime.dataset["dateTimeFormat"]!;
	
		let dateTimeFormat: Intl.DateTimeFormatOptions = {};
	
		dateTimeFormat = JSON.parse(StringLib.decodeDocumentBuilderEncodedString(rawDateTimeFormat)) as Intl.DateTimeFormatOptions;
	
		humanDateTime.innerText = DateTime
			.fromISO(humanDateTime.dateTime)
			.toLocaleString(dateTimeFormat);
	}

	humanDateTime.classList.add("initialised");
}

export function initialiseHumanDateTimes()
{
	const humanDateTimes = document.querySelectorAll<HTMLTimeElement>(".component-human-date-time:not(.initialised)");

	console.log("[HumanDateTime] Initialising " + humanDateTimes.length + " instances...");

	for (const humanDateTime of humanDateTimes)
	{
		try
		{
			initialiseHumanDateTime(humanDateTime);
		}
		catch (error)
		{
			console.error("[HumanDateTime] Error initialising:", humanDateTime, error);
		}
	}
}