//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export function Breadcrumbs(items: BreadcrumbsItemOptions[])
{
	return new DE("ul", "component-breadcrumbs", items.map(BreadcrumbsItem));
}

export type BreadcrumbsItemOptions =
{
	href?: string | null;
	text: Child;
};

export function BreadcrumbsItem(options: BreadcrumbsItemOptions)
{
	const tagName = options.href != null ? "a" : "span";

	return new DE("li", "component-breadcrumbs-item",
		[
			new DE(tagName,
				{
					href: options.href,
				},
				[
					options.text,
				]),
		]);
}