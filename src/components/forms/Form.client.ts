//
// Imports
//

import { HiddenInput } from "./HiddenInput.js";

import { Notice, NoticeOptions } from "../Notice.js";

//
// Types
//

declare const grecaptcha: any;

//
// Classes
//

export class FormError extends Error
{
	notices: NoticeOptions[];

	constructor(notices: NoticeOptions[])
	{
		super();

		this.name = "FormError";

		this.notices = notices;
	}
}

//
// Local Functions
//

function getElement(parent: HTMLElement, selector: string): HTMLElement
{
	const element = parent.querySelector(selector) as HTMLElement | null;

	if (element == null)
	{
		throw new Error("Element not found: " + selector);
	}

	return element;
}

async function loadRecaptchaScript(siteKey: string): Promise<void>
{
	const existingScript = document.querySelector("script.recaptcha-script");

	if (existingScript != null)
	{
		return;
	}

	return new Promise(
		(resolve, reject) =>
		{
			const script = document.createElement("script");

			script.classList.add("recaptcha-script");

			script.src = "https://www.google.com/recaptcha/api.js?render=" + siteKey;

			script.async = true;

			script.addEventListener("load",
				() =>
				{
					resolve();
				});

			script.addEventListener("error",
				() =>
				{
					reject();
				});

			document.head.appendChild(script);
		});
}

async function waitForRecaptchaScript(): Promise<void>
{
	return new Promise(
		(resolve) =>
		{
			const check = () =>
			{
				if (typeof grecaptcha !== "undefined")
				{
					resolve();
				}
				else
				{
					setTimeout(check, 100);
				}
			};

			check();
		});
}

async function getRecaptchaToken(siteKey: string): Promise<string>
{
	const token = await new Promise(
		(resolve) =>
		{
			grecaptcha.ready(
				async () =>
				{
					const token = await grecaptcha.execute(siteKey,
						{
							action: "submit",
						});

					resolve(token);
				});
		}) as string;

	return token;
}

function populateNoticeContainer(noticeContainer: HTMLElement, notices: NoticeOptions[]): void
{
	const noticeElements = notices.map((notice) => Notice(notice).renderToHTMLElement());

	noticeContainer.replaceChildren(...noticeElements);
}

type HandleSubmissionContext =
{
	event: SubmitEvent;
	form: HTMLFormElement;
	method: string;
	action: string;
	noticeContainer: HTMLElement;
};

type HandleSubmission = (context: HandleSubmissionContext) => Promise<void>;

async function submitForm(event: SubmitEvent, form: HTMLFormElement, handleSubmission: HandleSubmission)
{
	//
	// Get Options and Elements
	//

	console.log("[Form] Getting options and elements...");

	const maxFileSize = parseInt(form.dataset["maxFileSize"] ?? "-1");

	const protectedBy = form.dataset["protectedBy"] ?? "none";

	const noticeContainer = getElement(form, ".notices");

	const hiddenContainer = getElement(form, ".hidden");

	const inputsContainer = getElement(form, ".inputs");

	const fileInputs = inputsContainer.querySelectorAll("input[type=file]") as NodeListOf<HTMLInputElement>;

	//
	// Check Validity
	//

	console.log("[Form] Checking validity...");

	const isValid = form.checkValidity();

	if (!isValid)
	{
		form.reportValidity();

		return;
	}

	//
	// Check File Sizes
	//

	if (maxFileSize != -1)
	{
		console.log("[Form] Checking file sizes...");

		const tooLargeFiles: File[] = [];

		for (const fileInput of fileInputs)
		{
			if (fileInput.files == null)
			{
				continue;
			}

			for (const file of Array.from(fileInput.files))
			{
				if (file.size > maxFileSize)
				{
					tooLargeFiles.push(file);
				}
			}
		}

		if (tooLargeFiles.length > 0)
		{
			populateNoticeContainer(noticeContainer, 
				tooLargeFiles.map((file) =>
				{
					return {
						type: "warning",
						message: "File too large: " + file.name,
					};
				}));

			return;
		}
	}

	//
	// Get Submit Buttons
	//

	console.log("[Form] Getting submit button(s)...");

	const submitButtons = Array.from(document.querySelectorAll(`button[type="submit"]`)) as HTMLButtonElement[];

	const clickedSubmitButton = event.submitter;

	const clickedSubmitButtonIcon = clickedSubmitButton?.querySelector(".icon");

	let originalClickedSubmitButtonIcon = clickedSubmitButtonIcon?.className;

	//
	// Try
	//

	try
	{
		//
		// Disable Submit Buttons
		//

		console.log("[Form] Disabling submit buttons:", submitButtons);

		for (const submitButton of submitButtons)
		{
			submitButton.disabled = true;
		}

		//
		// Get Method & Action
		//

		let method = form.getAttribute("method") ?? "GET";
	
		let action = form.getAttribute("action") ?? "";

		//
		// Handle Clicked Submit Button
		//

		if (clickedSubmitButton != null)
		{
			console.log("[Form] Handling clicked submit button:", clickedSubmitButton);

			method = clickedSubmitButton.getAttribute("formmethod") ?? method;

			action = clickedSubmitButton.getAttribute("formaction") ?? action;

			if (clickedSubmitButtonIcon != null)
			{
				clickedSubmitButtonIcon.className = "icon fa-solid fa-spinner fa-spin";
			}

			const name = clickedSubmitButton.getAttribute("name");
			
			const value = clickedSubmitButton.getAttribute("value");

			if (name != null && value != null)
			{
				const submitButtonInputs = form.querySelectorAll("input.submit-button-input") as NodeListOf<HTMLInputElement>;

				for (const input of submitButtonInputs)
				{
					input.remove();
				}

				const submitButtonInput = document.createElement("input");

				submitButtonInput.classList.add("submit-button-input");

				submitButtonInput.type = "hidden";

				submitButtonInput.name = name;

				submitButtonInput.value = value;

				hiddenContainer.appendChild(submitButtonInput);
			}
		}

		//
		// Protection
		//
 
		switch (protectedBy)
		{
			case "recaptcha":
			{
				console.log("[Form] Protecting with Recaptcha...");

				await waitForRecaptchaScript();

				const recaptchaSiteKey = form.dataset["recaptchaSiteKey"];

				if (recaptchaSiteKey == null)
				{
					throw new Error("Recaptcha site key not in form dataset.");
				}

				form.querySelector("input[name=recaptcha_token]")?.remove();
		
				const token = await getRecaptchaToken(recaptchaSiteKey);

				const input = HiddenInput("recaptcha_token", token).renderToHTMLElement();
		
				form.appendChild(input);

				break;
			}
		}

		//
		// Submit Form
		//

		console.log("[Form] Submitting form...");

		await handleSubmission(
			{
				event,
				form,
				method,
				action,
				noticeContainer,
			});
	}
	catch (error)
	{
		console.error("[Form] Error submitting form:", error);

		if (error instanceof FormError)
		{
			populateNoticeContainer(noticeContainer, error.notices);
		}
		else
		{
			populateNoticeContainer(noticeContainer,
				[
					{
						type: "danger",
						message: error instanceof Error ? error.message : "An unknown error occurred.",
					}
				]);
		}

		console.log("[Form] Re-enabling submit buttons...");
		
		for (const submitButton of submitButtons)
		{
			submitButton.disabled = false;
		}

		if (clickedSubmitButtonIcon != null)
		{
			console.log("[Form] Restoring clicked submit button icon...");

			clickedSubmitButtonIcon.className = originalClickedSubmitButtonIcon ?? "";
		}
	}
}

//
// Component
//

export function initialiseForm(form: HTMLFormElement, handleSubmission: HandleSubmission)
{
	form.addEventListener("submit", 
		async (event) =>
		{
			event.preventDefault();

			console.log("[Form] Handling submission:", form);

			await submitForm(event, form, handleSubmission);
		});
}

export function initialiseForms() : void
{
	const forms = document.querySelectorAll(`.component-form:not(.initialised):not([data-manually-initialize="true"])`) as NodeListOf<HTMLFormElement>;

	console.log("[Form] Initialising " + forms.length + " instances...");

	let recaptchaSiteKey : string | null = null;

	for (const form of forms)
	{
		if (form.dataset["recaptchaSiteKey"] != null)
		{
			recaptchaSiteKey = form.dataset["recaptchaSiteKey"];
		}

		form.classList.add("initialised");

		try
		{
			initialiseForm(form,
				async (context) =>
				{
					context.form.method = context.method;

					context.form.action = context.action;

					context.form.submit();
				});
		}
		catch (error)
		{
			console.error("[Form] Error Initialising form:", form, error);
		}
	}

	if (recaptchaSiteKey != null)
	{
		console.log("[Form] Loading Recaptcha script...");
	
		loadRecaptchaScript(recaptchaSiteKey);
	}
}