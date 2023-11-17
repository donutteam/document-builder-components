//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export function BubbleList(children : Child[]) : Child
{
	if (children.length === 0)
	{
		return null;
	}

	return new DE("div", "component-bubble-list", children.map(Item));
}

//
// Local Components
//

function Item(child : Child) : Child
{
	if (child == null)
	{
		return null;
	}

	return new DE("div", "component-bubble-list-item", child);
}