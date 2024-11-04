//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Locals
//

function getIconName(type: NoticeType)
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

//
// Component
//

export type NoticeType = "danger" | "info" | "success" | "warning";

export type NoticeOptions =
{ 
	type: NoticeType;
	message: Child;
	dismissible?: boolean;
	roundedCorners?: boolean;
};

export function Notice(options: NoticeOptions)
{
	//
	// Options
	//

	const type = options.type;

	const message = options.message;

	const dismissible = options.dismissible ?? false;

	const roundedCorners = options.roundedCorners ?? true;

	//
	// Build Notice
	//

	let className = "component-notice " + type;

	if (roundedCorners)
	{
		className += " rounded-corners";
	}

	return new DE("div", className,
		[
			new DE("div", "icon-container",
				[
					new DE("span", "icon " + getIconName(type) + " fa-fw"),
				]),

			new DE("div", "content-container", message),
			
			dismissible ? new DE("div", "dismiss-container", new DE("span", "dismiss", "Dismiss")) : null,
		]);
}