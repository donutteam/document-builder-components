//
// Imports
//

import { Child, DE } from "@donutteam/document-builder";

//
// Component
//

export interface MetaOptions
{
	blockRobots? : boolean;

	description? : string;

	keywords? : string[];

	themeColor? : string;

	title? : Child;
}

export function Meta(options : MetaOptions) : Child[]
{
	//
	// Options
	//

	const blockRobots = options.blockRobots ?? true;
	
	const description = options.description ?? null;

	const keywords = options.keywords ?? null;

	const themeColor = options.themeColor ?? null;

	const title = options.title ?? null;

	//
	// Build Tags
	//

	const tags = [];

	// Basic Tags
	tags.push(new DE("meta",
		{
			charset: "utf-8",
		}));

	tags.push(new DE("meta",
		{
			"http-equiv": "content-language",
			content: "en-us",
		}));

	tags.push(new DE("meta",
		{
			name: "viewport",
			content: "width=device-width",
		}));

	// Block Robots
	if (blockRobots)
	{
		tags.push(new DE("meta",
			{
				name: "robots",
				content: "noindex, nofollow",
			}));
	}

	// Description
	if (description != null)
	{
		tags.push(new DE("meta",
			{
				name: "description",
				content: description,
			}));
	}

	// Keywords
	if (keywords != null)
	{
		tags.push(new DE("meta",
			{
				name: "keywords",
				content: keywords.join(","),
			}));
	}

	// Theme Color
	if (themeColor != null)
	{
		tags.push(new DE("meta",
			{
				name: "theme-color",
				content: themeColor,
			}));
	}

	// Title
	if (title != null)
	{
		tags.push(new DE("title", null, title));
	}

	//
	// Return Tags
	//

	return tags;
}