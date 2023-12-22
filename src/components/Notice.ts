//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export interface NoticeOptions
{
	type : NoticeType;

	message : Child;
}

export type NoticeType = "danger" | "info" | "success" | "warning";

export function Notice(options : NoticeOptions) : DE
{
	const iconName = getIconName(options.type);

	return new DE("div", "component-notice " + options.type,
		[
			new DE("span", "icon-wrapper",
				[
					new DE("span", "icon " + iconName + " fa-fw"),
				]),

			new DE("span", "content-container", options.message),
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

		case "info":
			return "fa-solid fa-circle-info";

		case "success":
			return "fa-solid fa-check";

		case "warning":
			return "fa-solid fa-triangle-exclamation";
	}
}