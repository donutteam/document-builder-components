//
// Imports
//

import { DateTime } from "luxon";

//
// Component
//

export const initialisedHumanRelativeTimeElements : HTMLElement[] = [];

let updateHumanRelativeTimeElementsInterval : number | null = null;

export function initialiseHumanRelativeTimes()
{
	const humanRelativeTimeElements = Array.from(document.querySelectorAll(".component-human-relative-time:not(.initialised)")) as HTMLTimeElement[];

	console.log("Initialising " + humanRelativeTimeElements.length + " HumanRelativeTime elements...");

	if (humanRelativeTimeElements.length == 0)
	{
		return;
	}

	for (const humanRelativeTimeElement of humanRelativeTimeElements)
	{
		humanRelativeTimeElement.classList.add("initialised");

		initialisedHumanRelativeTimeElements.push(humanRelativeTimeElement);
	}

	if (updateHumanRelativeTimeElementsInterval != null)
	{
		clearInterval(updateHumanRelativeTimeElementsInterval);
	}

	setInterval(() => updateHumanRelativeTimeElements(), 1000);
}

export function updateHumanRelativeTimeElements()
{
	for (const humanRelativeTimeElement of initialisedHumanRelativeTimeElements)
	{
		try
		{
			const rawTimestampSeconds = humanRelativeTimeElement.dataset["data-timestamp-seconds"]!;

			const timestampSeconds = parseInt(rawTimestampSeconds);

			const relativeTime = DateTime.fromSeconds(timestampSeconds).toRelative();

			if (relativeTime == null)
			{
				continue;
			}

			// Note: Don't trigger unnecessary DOM updates.
			if (relativeTime == humanRelativeTimeElement.innerText)
			{
				continue;
			}

			humanRelativeTimeElement.innerText = relativeTime;
		}
		catch (error)
		{
			console.error("[HumanRelativeTime] Failed to update human relative time element:", error);
		}
	}
}