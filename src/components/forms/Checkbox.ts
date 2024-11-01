//
// Imports
//

import { ChildSchema, DE, InputElementAttributesSchema } from "@donutteam/document-builder";
import { z } from "zod";

//
// Component
//

export const CheckboxOptionsSchema = z.object(
	{
		type: z.enum([ "checkbox", "radio" ]).optional(),
		name: z.string(),
		checked: z.boolean().optional(),
		extraAttributes: InputElementAttributesSchema.optional(),
		label: ChildSchema,
	});

export type CheckboxOptions = z.infer<typeof CheckboxOptionsSchema>;

export function Checkbox(options: CheckboxOptions)
{
	const type = options.type ?? "checkbox";

	return new DE("label", "component-checkbox",
		[
			new DE("input",
				{
					type,
					name: options.name,
					checked: options.checked,

					...options.extraAttributes,
				}),

			new DE("div", null, options.label),
		]);
}