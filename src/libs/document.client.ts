//
// Imports
//

import { z } from "zod";

//
// Utility Functions
//

export function getBooleanDataOrThrow(element: HTMLElement, key: string)
{
	const data = element.dataset[key];

	if (data === undefined)
	{
		throw new Error("Data not found: " + key);
	}

	if (data === "true")
	{
		return true;
	}

	if (data === "false")
	{
		return false;
	}

	throw new Error("Data is not a boolean: " + key);
}

export function getIntegerDataOrThrow(element: HTMLElement, key: string)
{
	const data = element.dataset[key];

	if (data === undefined)
	{
		throw new Error("Data not found: " + key);
	}

	const parseResult = z.coerce.number().int().safeParse(data);

	if (!parseResult.success)
	{
		throw new Error("Data is not an integer: " + key);
	}

	return parseResult.data;
}

export function getStringDataOrThrow(element: HTMLElement, key: string)
{
	const data = element.dataset[key];

	if (data === undefined)
	{
		throw new Error("Data not found: " + key);
	}

	return data;
}

export function getElementOrThrow<T extends HTMLElement = HTMLElement>(parent: Document | HTMLElement, selector: string)
{
	const element = parent.querySelector(selector) as T;

	if (element == null)
	{
		throw new Error("Element not found: " + selector);
	}

	return element;
}