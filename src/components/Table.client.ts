//
// Component
//

export function initialiseTables()
{
	const tableContainers = Array.from(document.querySelectorAll(".component-table"));

	for (const tableContainer of tableContainers)
	{
		const table = tableContainer.querySelector("table") as HTMLTableElement;

		const sortableTableHeaders = Array.from(table.querySelectorAll(`th[data-is-sortable="true"]`));

		for (const sortableTableHeader of sortableTableHeaders)
		{
			sortableTableHeader.addEventListener("click", () =>
			{
				//
				// Reset Sort Icons
				//

				for (const tableHeader of sortableTableHeaders)
				{
					const sortIcon = tableHeader.querySelector(".sort-icon") as HTMLElement;

					sortIcon.classList.remove("fa-sort-up");
					sortIcon.classList.remove("fa-sort-down");
					sortIcon.classList.add("fa-sort");
				}

				//
				// Get Sort Icon
				//

				const sortIcon = sortableTableHeader.querySelector(".sort-icon") as HTMLElement;

				//
				// Get Current Sort Direction
				//

				const currentSortDirection = sortableTableHeader.getAttribute("data-sort-direction");

				//
				// Set New Sort Direction
				//

				let newSortDirection : string;

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
					default:
					{
						sortIcon.classList.remove("fa-sort");
						sortIcon.classList.remove("fa-sort-up");
						sortIcon.classList.add("fa-sort-down");

						newSortDirection = "ASC";

						break;
					}
				}

				sortableTableHeader.setAttribute("data-sort-direction", newSortDirection);

				console.log(currentSortDirection, newSortDirection);

				//
				// Sort Rows
				//

				const sortValueType = sortableTableHeader.getAttribute("data-sort-value-type") as "string" | "number";

				const columnIndex = parseInt(sortableTableHeader.getAttribute("data-column-index") as string);

				const tableRowWrappers = Array.from(table.querySelectorAll("tbody tr"))
					.map((tableRow) =>
					{
						const column = tableRow.querySelector("td:nth-child(" + (columnIndex + 1) + ")") as HTMLElement;

						const sortValue = column.getAttribute("data-sort-value") as string;

						return {
							sortValue: sortValueType == "number"
								? parseFloat(sortValue)
								: sortValue,
							tableRow,
						};
					});

				switch (sortValueType)
				{
					case "number":
					{
						tableRowWrappers.sort((a, b) =>
						{
							return (a.sortValue as number) - (b.sortValue as number);
						});

						break;
					}

					case "string":
					{
						tableRowWrappers.sort((a, b) =>
						{
							return (a.sortValue as string).localeCompare(b.sortValue as string);
						});

						break;
					}
				}

				if (newSortDirection == "DESC")
				{
					tableRowWrappers.reverse();
				}

				const sortedTableRows = tableRowWrappers.map(tableRowWrapper => tableRowWrapper.tableRow);

				//
				// Remove All Rows
				//

				const tableBody = table.querySelector("tbody") as HTMLTableSectionElement;

				while (tableBody.firstChild)
				{
					tableBody.removeChild(tableBody.firstChild);
				}

				//
				// Create Document Fragment
				//

				const documentFragment = document.createDocumentFragment();

				for (const sortedTableRow of sortedTableRows)
				{
					documentFragment.appendChild(sortedTableRow);
				}

				//
				// Append Document Fragment
				//

				tableBody.appendChild(documentFragment);
			});
		}
	}
}