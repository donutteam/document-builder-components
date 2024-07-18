//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export const HEADER_LEVEL_1 = 1;

export const HEADER_LEVEL_2 = 2;

export const HEADER_LEVEL_3 = 3;

export const HEADER_LEVEL_4 = 4;

export const HEADER_LEVEL_5 = 5;

export const HEADER_LEVEL_6 = 6;

export type HeaderLevel = typeof HEADER_LEVEL_1 | typeof HEADER_LEVEL_2 | typeof HEADER_LEVEL_3 | typeof HEADER_LEVEL_4 | typeof HEADER_LEVEL_5 | typeof HEADER_LEVEL_6;

export function Header(level : HeaderLevel, children : Child) : DE
{
	return new DE("h" + level, "component-header", children);
}