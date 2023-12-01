//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export function Paragraph(child : Child) : Child
{
	if (child == null)
	{
		return null;
	}

	return new DE("p", "component-paragraph", child);
}