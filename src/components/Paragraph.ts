//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export function Paragraph(child : Child) : DE | null
{
	if (child == null)
	{
		return null;
	}

	return new DE("p", "component-paragraph", child);
}