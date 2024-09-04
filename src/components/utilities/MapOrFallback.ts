//
// Imports
//

import { Child } from "@donutteam/document-builder";

//
// Component
//

export function MapOrFallback<T>(items: T[], mapFunction: (item: T) => Child, fallback?: Child): Child
{
	if (items.length === 0)
	{
		return fallback ?? null;
	}

	return items.map(mapFunction);
}