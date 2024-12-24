//
// Imports
//

import { DateTime } from "luxon";

import * as DocumentClientLib from "../libs/document.client.js";

//
// Component
//

let updateHumanRelativeTimeElementsInterval: ReturnType<typeof setInterval> | null = null;

function updateHumanRelativeTimeElements()
{
	const humanRelativeTimes = document.querySelectorAll<HTMLTimeElement>(".component-human-relative-time.initialised");

	for (const humanRelativeTime of humanRelativeTimes)
	{
		try
		{
			const timestampSeconds = DocumentClientLib.getIntegerDataOrThrow(humanRelativeTime, "timestampSeconds");

			const relativeTime = DateTime.fromSeconds(timestampSeconds).toRelative();

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

export function initialiseHumanRelativeTime(humanRelativeTime: HTMLTimeElement)
{
	DocumentClientLib.getIntegerDataOrThrow(humanRelativeTime, "timestampSeconds");

	humanRelativeTime.classList.add("initialised");

	if (updateHumanRelativeTimeElementsInterval == null)
	{
		console.log("[HumanRelativeTime] Starting update interval...");

		updateHumanRelativeTimeElementsInterval = setInterval(() => updateHumanRelativeTimeElements(), 1000);
	}
}

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
			console.error("[HumanRelativeTime] Error:", humanRelativeTime, error);
		}
	}
}