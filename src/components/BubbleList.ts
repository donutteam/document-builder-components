//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Locals
//

function Item(child: Child)
{
	if (child == null)
	{
		return null;
	}

	return new DE("div", "component-bubble-list-item", child);
}

//
// Component
//

export function BubbleList(children: Child[])
{
	if (children.length === 0)
	{
		return new DE(null, null);
	}

	return new DE("div", "component-bubble-list", children.map(Item));
}