//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export function Paragraph(child : Child) : DE
{
	if (child == null)
	{
		return new DE(null, null);
	}

	return new DE("p", "component-paragraph", child);
}