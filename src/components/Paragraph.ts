//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export function Paragraph(child : Child) : DE
{
	return new DE("p", "component-paragraph", child);
}