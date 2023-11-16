//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Component
//

export function Breadcrumbs(items : BreadcrumbsItemOptions[]) : DE
{
	return new DE("ul", "component-breadcrumbs", items.map(BreadcrumbsItem));
}

export interface BreadcrumbsItemOptions
{
	href? : string | null;
	text : string;
}

export function BreadcrumbsItem(options : BreadcrumbsItemOptions) : DE
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