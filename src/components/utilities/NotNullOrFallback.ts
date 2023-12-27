//
// Imports
//

import { Child } from "@donutteam/document-builder";

//
// Component
//

export function NotNullOrFallback<T>(value : T, notNullFunction : (item : NonNullable<T>) => Child, fallbackChild? : Child) : Child
{
	if (value == null)
	{
		return fallbackChild ?? null;
	}

	return notNullFunction(value);
}