//
// Imports
//

import { type Child, DE } from "@donutteam/document-builder";

//
// Exports
//

export interface TableColumn<Type>
{
	enabled : boolean;

	hasPadding : boolean;

	getChild : (item : Type) => Child;

	getSortValue? : (item : Type) => string | number;

	noWrap : boolean;

	sortValueType? : "string" | "number";

	title : Child;
}

export function Table<Type>(items : Type[], tableColumns : TableColumn<Type>[]) : DE
{
	//
	// Filter Non-Enabled Columns
	//

	tableColumns = tableColumns.filter(tableColumn => tableColumn.enabled);

	//
	// Build Table Header
	//

	const tableHeader = new DE("thead", null,
		[
			new DE("tr", null,
				[
					tableColumns.map((tableColumn, index) =>
					{
						let sortIcon : Child = null;

						if (tableColumn.getSortValue != null)
						{
							sortIcon =
								[
									" ",
									new DE("span", "sort-icon fa-solid fa-sort"),
								];
						}

						return new DE("th",
							{
								class: "header",

								"data-is-sortable": tableColumn.getSortValue != null,
								"data-sort-value-type": tableColumn.sortValueType ?? "string",
								"data-column-index": index,
							},
							[
								tableColumn.title,
								sortIcon,
							]);
					}),
				]),
		]);

	//
	// Build Table Body
	//

	const tableBody = new DE("tbody", null,
		[
			items.map(item =>
			{
				return TableRow(item, tableColumns);
			}),
		]);

	//
	// Build Table
	//

	return new DE("div", "component-table",
		[
			new DE("table", "table",
				[
					tableHeader,
					tableBody,
				]),
		]);
}

export function TableRow<Type>(item : Type, tableColumns : TableColumn<Type>[]) : DE
{
	//
	// Build Row
	//

	return new DE("tr", "component-table-row",
		[
			tableColumns.map(tableColumn =>
			{
				const cssClasses = [];

				cssClasses.push("column");

				if (tableColumn.hasPadding)
				{
					cssClasses.push("has-padding");
				}

				if (tableColumn.noWrap)
				{
					cssClasses.push("no-wrap");
				}

				return new DE("td",
					{
						class: cssClasses.join(" "),

						"data-is-sortable": tableColumn.getSortValue != null,
						"data-sort-value": tableColumn.getSortValue != null ? tableColumn.getSortValue(item) : null,
					},
					[
						tableColumn.getChild(item),
					]);
			}),
		]);
}