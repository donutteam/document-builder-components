//
// Imports
//

import { Notice, NoticeOptions } from "./Notice.js";

//
// Local Functions
//

function initialiseNotice(notice: HTMLElement)
{
	notice.classList.add("initialised");

	const dismissElement = notice.querySelector(".dismiss");

	if (dismissElement == null)
	{
		return;
	}

	dismissElement.addEventListener("click",
		() =>
		{
			notice.remove();
		});
}

//
// Component
//

export function createNotice(options: NoticeOptions): HTMLElement
{
	const notice = Notice(options).renderToHTMLElement();

	initialiseNotice(notice);

	return notice;
}

export function initialiseNotices()
{
	const notices = document.querySelectorAll(".component-notice:not(.initialised)") as NodeListOf<HTMLElement>;

	for (const notice of notices)
	{
		initialiseNotice(notice);
	}
}