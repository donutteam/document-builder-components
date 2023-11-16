//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export function Block(children : Child) : DE
{
	return new DE("div", "component-block", children);
}

export function BlockWithoutPadding(children : Child) : DE
{
	return new DE("div", "component-block no-padding", children);
}