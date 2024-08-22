//
// Imports
//

import { DateTime } from "luxon";

//
// Locals
//

let updateHumanRelativeTimeElementsInterval: number | null = null;

function initialiseHumanRelativeTime(humanRelativeTime: HTMLTimeElement)
{
	if (humanRelativeTime.dataset["timestampSeconds"] == null)
	{
		throw new Error("Missing data-timestamp-seconds attribute.");
	}

	humanRelativeTime.classList.add("initialised");
}

function updateHumanRelativeTimeElements()
{
	const humanRelativeTimes = document.querySelectorAll<HTMLTimeElement>(".component-human-relative-time.initialised");

	for (const humanRelativeTime of humanRelativeTimes)
	{
		try
		{
			const rawTimestampSeconds = humanRelativeTime.dataset["data-timestamp-seconds"]!;

			const timestampSeconds = parseInt(rawTimestampSeconds);

			const relativeTime = DateTime.fromSeconds(timestampSeconds).toRelative();

			if (relativeTime == null)
			{
				continue;
			}

			// Note: Don't trigger unnecessary DOM updates.
			if (relativeTime == humanRelativeTime.innerText)
			{
				continue;
			}

			humanRelativeTime.innerText = relativeTime;
		}
		catch (error)
		{
			console.error("[HumanRelativeTime] Failed to update human relative time element:", error);
		}
	}
}

//
// Component
//

export function initialiseHumanRelativeTimes()
{
	const humanRelativeTimes = document.querySelectorAll<HTMLTimeElement>(".component-human-relative-time:not(.initialised)");

	console.log("[HumanRelativeTime] Initialising " + humanRelativeTimes.length + " instances...");

	for (const humanRelativeTime of humanRelativeTimes)
	{
		try
		{
			initialiseHumanRelativeTime(humanRelativeTime);
		}
		catch (error)
		{
			console.error("[HumanRelativeTime] Error initialising:", humanRelativeTime, error);
		}
	}

	if (updateHumanRelativeTimeElementsInterval == null)
	{
		setInterval(() => updateHumanRelativeTimeElements(), 1000);
	}
}