//
// Imports
//

import { type Child, DE, ElementAttributes } from "@donutteam/document-builder";

//
// Locals
//

function Row<Type>(item: Type, tableColumns: TableColumn<Type>[], getTableRowAttributes?: (item: Type) => ElementAttributes)
{
	//
	// Build Row
	//

	return new DE("tr",
		{
			class: "component-table-row",

			...getTableRowAttributes?.(item),
		},
		[
			tableColumns.map(tableColumn =>
			{
				const hasPadding = tableColumn.hasPadding ?? true;

				const noWrap = tableColumn.noWrap ?? false;

				const cssClasses = [];

				cssClasses.push("column");

				if (hasPadding)
				{
					cssClasses.push("has-padding");
				}

				if (noWrap)
				{
					cssClasses.push("no-wrap");
				}

				return new DE("td",
					{
						class: cssClasses.join(" "),

						"data-is-sortable": tableColumn.getSortValue != null,
						"data-sort-value": tableColumn.getSortValue != null ? tableColumn.getSortValue(item) : null,

						...tableColumn.getAttributes?.(item),
					},
					[
						tableColumn.getChild(item),
					]);
			}),
		]);
}

//
// Component
//

export type TableColumn<Type> =
{
	title: Child;
	getChild: (item : Type) => Child;
	sortValueType?: "string" | "number";
	getSortValue?: (item : Type) => string | number;
	enabled?: boolean;
	hasPadding?: boolean;
	noWrap?: boolean;
	getAttributes?: (item : Type) => ElementAttributes;
};

export function Table<Type>(items: Type[], tableColumns: TableColumn<Type>[], getTableRowAttributes?: (item: Type) => ElementAttributes)
{
	tableColumns = tableColumns.filter(
		(tableColumn) => 
		{
			const enabled = tableColumn.enabled ?? true;

			return enabled;
		});

	const tableHeader = new DE("thead", null,
		[
			new DE("tr", null,
				[
					tableColumns.map(
						(tableColumn, index) =>
						{
							let sortIcon: Child = null;

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

	const tableBody = new DE("tbody", null,
		[
			items.map(item =>
			{
				return Row(item, tableColumns, getTableRowAttributes);
			}),
		]);

	return new DE("div", "component-table",
		[
			new DE("table", "table",
				[
					tableHeader,
					tableBody,
				]),
		]);
}