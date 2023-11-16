//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;

export function Header(level : HeaderLevel, children : Child) : DE
{
	return new DE("h" + level, "component-header", children);
}