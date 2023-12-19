//
// Imports
//

import { DateTime } from "luxon";

//
// Component
//

export const humanRelativeTimeElements : HTMLElement[] = [];

let updateHumanRelativeTimeElementsInterval : number | null = null;

export function initialiseHumanRelativeTimes()
{
	const humanRelativeTimeElements = Array.from(document.querySelectorAll(".component-human-relative-time:not(.initialised)")) as HTMLTimeElement[];

	if (humanRelativeTimeElements.length == 0)
	{
		return;
	}

	console.log("Initialising " + humanRelativeTimeElements.length + " human relative time elements...");

	for (const humanRelativeTimeElement of humanRelativeTimeElements)
	{
		humanRelativeTimeElements.push(humanRelativeTimeElement);

		humanRelativeTimeElement.classList.add("initialised");
	}

	if (updateHumanRelativeTimeElementsInterval != null)
	{
		clearInterval(updateHumanRelativeTimeElementsInterval);
	}

	updateHumanRelativeTimeElementsInterval = setInterval(() => updateHumanRelativeTimeElements(), 1000);
}

export function updateHumanRelativeTimeElements()
{
	for (const humanRelativeTimeElement of humanRelativeTimeElements)
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