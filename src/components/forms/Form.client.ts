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

interface SubmitFormOptions
{
	event : SubmitEvent;

	form : HTMLFormElement;
}

async function submitForm(options : SubmitFormOptions) : Promise<void>
{
	//
	// Get Options and Elements
	//

	console.log("[Form] Getting options and elements...");

	const maxFileSize = parseInt(options.form.dataset["maxFileSize"] ?? "-1");

	const protectedBy = options.form.dataset["protectedBy"] ?? "none";

	const noticeContainer = getElement(options.form, ".notices");

	const hiddenContainer = getElement(options.form, ".hidden");

	const inputsContainer = getElement(options.form, ".inputs");

	const fileInputs = inputsContainer.querySelectorAll("input[type=file]") as NodeListOf<HTMLInputElement>;

	//
	// Create Functions
	//

	console.log("[Form] Creating functions...");

	const populateNoticeContainer = (notices: NoticeOptions[]) =>
	{
		for (const notice of notices)
		{
			noticeContainer.appendChild(Notice(notice).renderToHTMLElement());
		}
	}

	//
	// Check Validity
	//

	console.log("[Form] Checking validity...");

	const isValid = options.form.checkValidity();

	if (!isValid)
	{
		options.form.reportValidity();

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
			populateNoticeContainer(tooLargeFiles.map(
				(file) =>
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
	// Disable Submission Buttons
	//

	console.log("[Form] Disabling submission buttons...");

	const submitButtons = Array.from(document.querySelectorAll(`button[type="submit"]`)) as HTMLButtonElement[];

	for (const submitButton of submitButtons)
	{
		submitButton.disabled = true;
	}

	//
	// Get Method & Action
	//

	let method = options.form.getAttribute("method") ?? "GET";

	let action = options.form.getAttribute("action") ?? "";

	//
	// Handle Submission Button
	//

	const submissionButton = options.event.submitter;

	if (submissionButton != null)
	{
		method = submissionButton.getAttribute("formmethod") ?? method;

		action = submissionButton.getAttribute("formaction") ?? action;

		if (submissionButton.classList.contains("component-button"))
		{
			const icon = submissionButton.querySelector(".icon");

			if (icon != null)
			{
				icon.className = "icon fa-solid fa-spinner fa-spin";
			}
		}

		const name = submissionButton.getAttribute("name");
		
		const value = submissionButton.getAttribute("value");

		if (name != null && value != null)
		{
			const input = HiddenInput(name, value).renderToHTMLElement();

			hiddenContainer.appendChild(input);
		}
	}

	console.log("[Form] Method:", method);

	console.log("[Form] Action:", action);

	console.log("[Form] Submission button: ", submissionButton);

	//
	// Spam Protection
	//

	switch (protectedBy)
	{
		case "recaptcha":
		{
			await waitForRecaptchaScript();

			const recaptchaSiteKey = options.form.dataset["recaptchaSiteKey"];

			if (recaptchaSiteKey == null)
			{
				throw new Error("Recaptcha site key not in form dataset.");
			}

			options.form.querySelector("input[name=recaptcha_token]")?.remove();
	
			const token = await getRecaptchaToken(recaptchaSiteKey);

			const input = HiddenInput("recaptcha_token", token).renderToHTMLElement();
	
			options.form.appendChild(input);

			break;
		}
	}

	//
	// Submit Form
	//

	options.form.method = method;

	options.form.action = action;

	options.form.submit();
}

async function initialiseForm(form: HTMLFormElement): Promise<void>
{
	form.addEventListener("submit", 
		async (event) =>
		{
			event.preventDefault();

			await submitForm(
				{
					event,
					form,
				});
		});
}

//
// Component
//

export function initialiseForms() : void
{
	const forms = document.querySelectorAll(".component-form:not(.initialised)") as NodeListOf<HTMLFormElement>;

	console.log("Initialising " + forms.length + " Form components...");

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
			initialiseForm(form);
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