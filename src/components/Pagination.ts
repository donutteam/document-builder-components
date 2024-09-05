//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Locals
//



//
// Local Components
//

function getPageNumbers(currentPageNumber: number, totalPageCount: number)
{
	switch (currentPageNumber)
	{
		case 1:
		case 2:
		case 3:
		case 4:
		{
			const pageNumbers = [ 1, 2, 3, 4, 5, 6, 7 ];

			return pageNumbers.slice(0, totalPageCount);
		}

		case totalPageCount - 3:
		case totalPageCount - 2:
		case totalPageCount - 1:
		case totalPageCount:
		{
			let pageNumbers =
			[
				totalPageCount - 6,
				totalPageCount - 5,
				totalPageCount - 4,
				totalPageCount - 3,
				totalPageCount - 2,
				totalPageCount - 1,
				totalPageCount,
			];

			if (totalPageCount < 7)
			{
				const numToRemove = 7 - totalPageCount;

				pageNumbers = pageNumbers.slice(numToRemove, pageNumbers.length);
			}

			return pageNumbers;
		}

		default:
		{
			const pageNumbers =
			[
				currentPageNumber - 3,
				currentPageNumber - 2,
				currentPageNumber - 1,
				currentPageNumber,
				currentPageNumber + 1,
				currentPageNumber + 2,
				currentPageNumber + 3,
			];

			return pageNumbers.slice(0, totalPageCount);
		}
	}
}

type PageOptions =
{
	child?: Child;
	isCurrent: boolean;
	pageNumber: number;
	searchParameters: URLSearchParams;
};

function Page(options: PageOptions)
{
	let className = "component-pagination-page";

	if (options.isCurrent)
	{
		className += " current-page";
	}

	const searchParams = new URLSearchParams(options.searchParameters);

	searchParams.set("page", options.pageNumber.toString());

	return new DE("a",
		{
			class: className,
			href: "?" + searchParams.toString(),
		},
		[
			new DE("span", "children-wrapper", options.child ?? options.pageNumber),
		]);
}

//
// Component
//

export type PaginationOptions =
{
	currentPageNumber: number;
	totalPageCount: number;
	searchParameters: URLSearchParams;
}

export function Pagination(options: PaginationOptions)
{
	//
	// Check for Single Page
	//

	if (options.totalPageCount == 1)
	{
		return null;
	}

	//
	// Build Pagination
	//

	const pageNumbers = getPageNumbers(options.currentPageNumber, options.totalPageCount);

	const pages: Child[] = [];

	pages.push(Page(
		{
			child: new DE("span", "fa-solid fa-backward"),
			isCurrent: false,
			pageNumber: 1,
			searchParameters: options.searchParameters,
		}));

	for (const pageNumber of pageNumbers)
	{
		pages.push(Page(
			{
				isCurrent: pageNumber == options.currentPageNumber,
				pageNumber,
				searchParameters: options.searchParameters,
			}));
	}

	pages.push(Page(
		{
			child: new DE("span", "fa-solid fa-forward"),
			isCurrent: false,
			pageNumber: options.totalPageCount,
			searchParameters: options.searchParameters,
		}));

	return new DE("div",
		{
			class: "component-pagination",

			"data-num-page-numbers": pageNumbers.length.toString(),
		},
		[
			pages,
		]);
}