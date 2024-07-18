//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export interface NoticeOptions
{
	dismissible? : boolean;

	roundedCorners? : boolean;

	type : NoticeType;

	message : Child;
}

export type NoticeType = "danger" | "info" | "success" | "warning";

export function Notice(options : NoticeOptions) : DE
{
	const iconName = getIconName(options.type);

	const iconContainer = new DE("div", "icon-container",
		[
			new DE("span", "icon " + iconName + " fa-fw"),
		]);

	const contentContainer = new DE("div", "content-container", options.message);

	const dismissible = options.dismissible ?? false;

	let dismissContainer = dismissible
		? new DE("div", "dismiss-container",
			[
				new DE("span", "dismiss", "Dismiss"),
			])
		: new DE("div");

	const roundedCorners = options.roundedCorners ?? true;

	return new DE("div", "component-notice " + options.type + (roundedCorners ? " rounded-corners" : ""),
		[
			iconContainer,
			contentContainer,
			dismissContainer,
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