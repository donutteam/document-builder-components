//
// Imports
//

import { Notice, NoticeOptions } from "./Notice.js";

//
// Component
//

export function createNotice(options: NoticeOptions)
{
	const notice = Notice(options).renderToHTMLElement();

	initialiseNotice(notice);

	return notice;
}

export function initialiseNotice(notice: HTMLElement)
{
	const dismissElement = notice.querySelector(".dismiss");

	// Note: Not all notices have a dismiss button
	dismissElement?.addEventListener("click", () => notice.remove());

	notice.classList.add("initialised");
}

export function initialiseNotices()
{
	const notices = document.querySelectorAll<HTMLElement>(".component-notice:not(.initialised)");

	console.log("[Notice] Initialising " + notices.length + " instances...");

	for (const notice of notices)
	{
		try
		{
			initialiseNotice(notice);
		}
		catch (error)
		{
			console.error("[Notice] Error:", notice, error);
		}
	}
}