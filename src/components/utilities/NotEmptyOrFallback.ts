//
// Imports
//

import { Child } from "@donutteam/document-builder";

//
// Component
//

export function NotEmptyOrFallback<T>(items: T[], child: Child, fallbackChild?: Child): Child
{
	if (items.length === 0)
	{
		return fallbackChild ?? null;
	}

	return child;
}