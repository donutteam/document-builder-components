//
// Imports
//

import * as DocumentClientLib from "../../libs/document.client.js";

//
// Component
//

export function initialiseInput(input: HTMLElement)
{
	const type = DocumentClientLib.getStringDataOrThrow(input, "type");

	switch (type)
	{
		case "password":
		{
			const inputInput = DocumentClientLib.getElementOrThrow<HTMLInputElement>(input, ".input");

			const overlay = DocumentClientLib.getElementOrThrow(input, ".overlay");

			const overlayIcon = DocumentClientLib.getElementOrThrow(overlay, ".icon");

			overlay.addEventListener("click", 
				() =>
				{
					const startingType = inputInput.type;

					inputInput.type = startingType == "password" ? "text" : "password";

					overlayIcon.classList.toggle("fa-eye");
					overlayIcon.classList.toggle("fa-eye-slash");
					overlayIcon.setAttribute("title", startingType == "password" ? "Hide password" : "Show password");
				});

			break;
		}

		case "select":
		{
			const inputSelect = DocumentClientLib.getElementOrThrow<HTMLSelectElement>(input, ".input");

			const overlay = DocumentClientLib.getElementOrThrow(input, ".overlay");

			overlay.addEventListener("click", () => inputSelect.click());

			break;
		}
	}

	input.classList.add("initialised");
}

export function initialiseInputs()
{
	const inputs = document.querySelectorAll<HTMLElement>(".component-input:not(.initialised)");

	console.log("[Input] Initialising " + inputs.length + " instances...");

	for (const input of inputs)
	{
		try
		{
			initialiseInput(input);
		}
		catch (error)
		{
			console.error("[Input] Error:", input, error);
		}
	}
}