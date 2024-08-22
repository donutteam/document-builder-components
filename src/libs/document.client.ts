//
// Utility Functions
//

export function getElementOrThrow<T extends HTMLElement = HTMLElement>(parent: Document | HTMLElement, selector: string)
{
	const element = parent.querySelector(selector) as T;

	if (!element)
	{
		throw new Error(`Element not found: ${selector}`);
	}

	return element;
}