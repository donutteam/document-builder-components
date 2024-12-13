//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Locals
//

function Item(child: Child)
{
	return new DE("div", "component-bubble-list-item", child);
}

//
// Component
//

export type BubbleListOptions =
{
	className?: string;
};

export function BubbleList(children: Child[]): DE
export function BubbleList(bubbleListOptions: BubbleListOptions, children: Child[]): DE
export function BubbleList(bubbleListOptionsOrChildren: BubbleListOptions | Child[], possibleChildren?: Child[]): DE
{
	let bubbleListOptions: BubbleListOptions = {};
	let children: Child[] = [];

	if (Array.isArray(bubbleListOptionsOrChildren))
	{
		children = bubbleListOptionsOrChildren;
	}
	else
	{
		bubbleListOptions = bubbleListOptionsOrChildren;
		children = possibleChildren ?? [];
	}

	children = children.filter(child => child != null);

	if (children.length === 0)
	{
		return new DE(null, null);
	}

	let className = "component-bubble-list";

	if (bubbleListOptions.className)
	{
		className += " " + bubbleListOptions.className;
	}

	return new DE("div", className, children.map(Item));
}