//
// Imports
//

import { DE } from "@donutteam/document-builder";

//
// Component
//

export interface ServerInjectedGlobalsOptions
{
	[key : string] : string;
}

export function ServerInjectedGlobals(serverInjectedGlobals : ServerInjectedGlobalsOptions) : DE
{
	const serverInjectedGlobalStrings = Object.entries(serverInjectedGlobals)
		.map((entry) =>
		{
			return `globalThis["${ entry[0] }"] = "${ entry[1] }";`;
		});

	return new DE("script", "component-server-injected-globals",
		[
			{
				rawMarkup: serverInjectedGlobalStrings.join(" "),
			},
		]);
}