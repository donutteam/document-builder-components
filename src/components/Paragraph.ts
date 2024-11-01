//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export function Paragraph(child: Child)
{
	if (child == null)
	{
		return null;
	}

	return new DE("p", "component-paragraph", child);
}