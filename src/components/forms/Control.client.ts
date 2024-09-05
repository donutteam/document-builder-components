//
// Imports
//

import * as DocumentClientLib from "../../libs/document.client.js";

//
// Component
//

export function initialiseControl(control: HTMLElement)
{
	const type = DocumentClientLib.getStringDataOrThrow(control, "type");

	switch (type)
	{
		case "password":
		{
			const input = DocumentClientLib.getElementOrThrow<HTMLInputElement>(control, ".input");

			const overlay = DocumentClientLib.getElementOrThrow(control, ".overlay");

			const overlayIcon = DocumentClientLib.getElementOrThrow(overlay, ".icon");

			overlay.addEventListener("click", 
				() =>
				{
					const startingType = input.type;

					input.type = startingType == "password" ? "text" : "password";

					overlayIcon.classList.toggle("fa-eye");
					overlayIcon.classList.toggle("fa-eye-slash");
					overlayIcon.setAttribute("title", startingType == "password" ? "Hide password" : "Show password");
				});

			break;
		}

		case "select":
		{
			const select = DocumentClientLib.getElementOrThrow<HTMLSelectElement>(control, ".input");

			const overlay = DocumentClientLib.getElementOrThrow(control, ".overlay");

			overlay.addEventListener("click", () => select.click());

			break;
		}
	}

	control.classList.add("initialised");
}

export function initialiseControls()
{
	const controls = document.querySelectorAll<HTMLElement>(".component-control:not(.initialised)");

	console.log("[Control] Initialising " + controls.length + " instances...");

	for (const control of controls)
	{
		try
		{
			initialiseControl(control);
		}
		catch (error)
		{
			console.error("[Control] Error:", control, error);
		}
	}
}