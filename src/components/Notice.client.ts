//
// Component
//

export function initialiseNotices()
{
	const notices = document.querySelectorAll(".component-notice");

	for (const notice of notices)
	{
		notice.querySelector(".dismiss")?.addEventListener("click",
			() =>
			{
				notice.remove();
			});
	}
}