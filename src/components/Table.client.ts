//
// Imports
//

import * as DocumentLib from "../libs/document.client.js";

//
// Types
//

type SortDirection = "ASC" | "DESC";

type SortValueType = "string" | "number";

//
// Locals
//

function resetSortIcons(tableHeaders: NodeListOf<HTMLTableCellElement>)
{
	for (const tableHeader of tableHeaders)
	{
		const sortIcon = tableHeader.querySelector<HTMLElement>(".sort-icon");

		if (sortIcon == null)
		{
			continue;
		}

		sortIcon.classList.remove("fa-sort-up");
		sortIcon.classList.remove("fa-sort-down");
		sortIcon.classList.add("fa-sort");
	}
}

function setSortDirection(tableHeader: HTMLTableCellElement): SortDirection
{
	const sortIcon = DocumentLib.getElementOrThrow(tableHeader, ".sort-icon");

	const currentSortDirection = tableHeader.dataset["sortDirection"] as SortDirection;

	if (currentSortDirection != "ASC" && currentSortDirection != "DESC")
	{
		throw new Error("Invalid data-sort-direction attribute.");
	}

	let newSortDirection: SortDirection;

	switch (currentSortDirection)
	{
		case "ASC":
		{
			sortIcon.classList.remove("fa-sort");
			sortIcon.classList.remove("fa-sort-down");
			sortIcon.classList.add("fa-sort-up");

			newSortDirection = "DESC";

			break;
		}

		case "DESC":
		{
			sortIcon.classList.remove("fa-sort");
			sortIcon.classList.remove("fa-sort-up");
			sortIcon.classList.add("fa-sort-down");

			newSortDirection = "ASC";

			break;
		}
	}

	tableHeader.dataset["sortDirection"] = newSortDirection;

	return newSortDirection;
}

function getSortValueType(tableHeader: HTMLTableCellElement): SortValueType
{
	let sortValueType = tableHeader.dataset["sortValueType"] as SortValueType;

	if (sortValueType != "string" && sortValueType != "number")
	{
		throw new Error("Invalid data-sort-value-type attribute.");
	}

	return sortValueType;
}

function getColumnIndex(tableHeader: HTMLTableCellElement): number
{
	if (tableHeader.dataset["columnIndex"] == null)
	{
		throw new Error("Missing data-column-index attribute.");
	}

	const columnIndex = Math.floor(Number(tableHeader.dataset["columnIndex"]));

	if (isNaN(columnIndex))
	{
		throw new Error("Invalid column index.");
	}

	return columnIndex;
}

function wrapTableRows(tableBody: HTMLTableSectionElement, sortValueType: SortValueType, columnIndex: number)
{
	const tableRows = Array.from(tableBody.querySelectorAll("tr"));

	const tableRowWrappers = tableRows
		.map((tableRow) =>
		{
			const column = DocumentLib.getElementOrThrow<HTMLTableCellElement>(tableRow, "td:nth-child(" + (columnIndex + 1) + ")");

			const sortValue = column.dataset["sortValue"] ?? "0";

			return {
				sortValue: sortValueType == "number"
					? Number(sortValue)
					: sortValue,
				tableRow,
			};
		});

	return tableRowWrappers;
}

function initialiseTable(tableComponent: HTMLElement)
{
	const table = DocumentLib.getElementOrThrow<HTMLTableElement>(tableComponent, "table");

	const tableHeaders = table.querySelectorAll("th");
				
	const tableBody = DocumentLib.getElementOrThrow<HTMLTableSectionElement>(table, "tbody");

	for (const tableHeader of tableHeaders)
	{
		if (tableHeader.dataset["isSortable"] != "true")
		{
			continue;
		}

		tableHeader.addEventListener("click", 
			() =>
			{
				resetSortIcons(tableHeaders);

				const sortDirection = setSortDirection(tableHeader);

				const sortValueType = getSortValueType(tableHeader);

				const columnIndex = getColumnIndex(tableHeader);

				const wrappedTableRows = wrapTableRows(tableBody, sortValueType, columnIndex);

				switch (sortValueType)
				{
					case "number":
					{
						wrappedTableRows.sort((a, b) => (a.sortValue as number) - (b.sortValue as number));

						break;
					}

					case "string":
					{
						wrappedTableRows.sort((a, b) => (a.sortValue as string).localeCompare(b.sortValue as string));

						break;
					}
				}

				const sortedTableRows = wrappedTableRows.map(wrappedTableRow => wrappedTableRow.tableRow);

				if (sortDirection == "DESC")
				{
					sortedTableRows.reverse();
				}

				tableBody.replaceChildren(...sortedTableRows);
			});
	}

	tableComponent.classList.add("initialised");
}

//
// Component
//

export function initialiseTables()
{
	const tableContainers = document.querySelectorAll<HTMLElement>(".component-table:not(.initialised)");

	console.log("[Table] Initialising " + tableContainers.length + " instances...");

	for (const tableContainer of tableContainers)
	{
		try
		{
			initialiseTable(tableContainer);
		}
		catch (error)
		{
			console.error("[Table] Error initialising:", error);
		}
	}
}