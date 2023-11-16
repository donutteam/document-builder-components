//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//
export type NoticeType = "danger" | "info" | "success" | "warning";

export function Notice(type : NoticeType, children : Child) : DE
{
	const iconName = getIconName(type);

	return new DE("div", "component-notice " + type,
		[
			new DE("span", "icon-wrapper",
				[
					new DE("span", "icon " + iconName + " fa-fw"),
				]),

			new DE("span", "content-container", children),
		]);
}

//
// Local Functions
//

function getIconName(type : NoticeType) : string
{
	switch (type)
	{
		case "danger":
			return "fa-solid fa-siren-on";

		case "success":
			return "fa-solid fa-check";

		case "warning":
			return "fa-solid fa-triangle-exclamation";

		default:
		case "info":
			return "fa-solid fa-circle-info";
	}
}