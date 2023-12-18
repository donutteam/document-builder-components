//
// Imports
//

import { DateTime } from "luxon";

//
// Component
//

(async () =>
{
	const updateHumanRelativeTimeElements = () =>
	{
		const humanRelativeTimeElements = Array.from(document.querySelectorAll(".component-human-relative-time")) as HTMLTimeElement[];

		for (const humanRelativeTimeElement of humanRelativeTimeElements)
		{
			const relativeTime = DateTime.fromISO(humanRelativeTimeElement.dateTime).toRelative();

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
	};

	updateHumanRelativeTimeElements();

	setInterval(() => updateHumanRelativeTimeElements(), 1000);
})();