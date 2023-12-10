//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export function BubbleList(children : Child[]) : DE
{
	if (children.length === 0)
	{
		return new DE(null, null);
	}

	return new DE("div", "component-bubble-list", children.map(Item));
}

//
// Local Components
//

function Item(child : Child) : DE
{
	if (child == null)
	{
		return new DE(null, null);
	}

	return new DE("div", "component-bubble-list-item", child);
}