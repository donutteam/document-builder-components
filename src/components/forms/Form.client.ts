//
// Imports
//

import { FormNoticeContainer } from "./FormNoticeContainer.js";

import { Notice, NoticeOptions } from "../Notice.js";

//
// Component
//

export type InitialiseFormOptions = Omit<SubmitFormOptions, "form" | "event">

export function initialiseForms(options : InitialiseFormOptions) : void
{
	//
	// Get Forms
	//

	const forms = Array.from(document.querySelectorAll(".component-form:not(.initialised)")) as HTMLFormElement[];

	if (forms.length == 0)
	{
		return;
	}

	//
	// Initialise Forms
	//

	console.log("Initialising " + forms.length + " Form components...");

	for (const form of forms)
	{
		form.classList.add("initialised");

		if (form.dataset["noHandler"] == "true")
		{
			continue;
		}

		form.addEventListener("submit", async (event) =>
		{
			//
			// Prevent Default
			//

			event.preventDefault();

			//
			// Submit Form
			//

			await submitForm(
				{
					...options,

					event,
					form,
				});
		});
	}
}

export interface SubmitFormOptions
{
	event : SubmitEvent;

	form : HTMLFormElement;

	onAjaxSubmissionResponse : (response : Response, populateNoticeContainerFunction : SubmitFormPopulateNoticeContainerFunction) => Promise<void>;
}

export type SubmitFormPopulateNoticeContainerFunction = (notices : NoticeOptions[]) => void;

async function submitForm(options : SubmitFormOptions) : Promise<void>
{
	//
	// Check Validity
	//

	console.log("[Form] Checking validity...");

	const isValid = options.form.checkValidity();

	if (!isValid)
	{
		console.log("[Form] Form is invalid.");

		options.form.reportValidity();

		return;
	}

	//
	// Get Notice Container
	//

	console.log("[Form] Getting notice container...");

	let noticeContainer = options.form.querySelector(".component-form-notice-container") as HTMLElement | null;

	if (noticeContainer == null)
	{
		console.log("[Form] No notice container, prepending one...");

		noticeContainer = FormNoticeContainer().renderToHTMLElement();

		options.form.prepend(noticeContainer);
	}

	const populateNoticeContainer : SubmitFormPopulateNoticeContainerFunction = (notices) =>
	{
		for (const notice of notices)
		{
			noticeContainer!.appendChild(Notice(notice).renderToHTMLElement());
		}
	};

	//
	// Check File Sizes
	//

	const maxFileSize = parseInt(options.form.dataset["maxFileSize"] ?? "-1");

	if (maxFileSize != -1)
	{
		console.log("[Form] Checking max file size...");

		const fileInputs = Array.from(options.form.querySelectorAll("input[type=file]")) as HTMLInputElement[];

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
					console.log("[Form] File size check failed:", file);

					populateNoticeContainer(
						[
							{
								type: "warning",
								message: "One or more files are too large.",
							},
						]);

					return;
				}
			}
		}

		console.log("[Form] Max file size check passed.");
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

	console.log("[Form] Method and action:", method, action);

	//
	// Update Clicked Submission Button
	//

	const submissionButton = options.event.submitter;

	console.log("[Form] Submission button:", submissionButton);

	if (submissionButton != null)
	{
		if (submissionButton.getAttribute("formmethod") != null)
		{
			method = submissionButton.getAttribute("formmethod")!;

			console.log("[Form] Using submission button method:", method);
		}

		if (submissionButton.getAttribute("formaction") != null)
		{
			action = submissionButton.getAttribute("formaction")!;

			console.log("[Form] Using submission button action:", action);
		}

		if (submissionButton.classList.contains("component-button"))
		{
			const icon = submissionButton.querySelector(".icon");

			console.log("[Form] Submission button icon:", icon);

			if (icon != null)
			{
				icon.className = "icon fa-solid fa-spinner fa-spin";

				console.log("[Form] Changed submission button icon to spinner.");
			}
		}
	}

	//
	// Include Clicked Submission Button Value
	//

	if (submissionButton != null)
	{
		const name = submissionButton.getAttribute("name");
		const value = submissionButton.getAttribute("value");

		if (name != null && value != null)
		{
			console.log("[Form] Including submission button value:", name, value);

			const input = document.createElement("input");

			input.type = "hidden";
			input.name = name;
			input.value = value;

			options.form.appendChild(input);
		}
	}

	//
	// Include ReCAPTCHA Token
	//

	if (options.form.dataset["recaptchaProtected"] == "true")
	{
		console.log("[Form] Requesting ReCAPTCHA token...");

		//
		// Get Site Key
		//

		if (!("GOOGLE_RECAPTCHA_SITE_KEY" in window) || typeof window.GOOGLE_RECAPTCHA_SITE_KEY != "string")
		{
			populateNoticeContainer(
				[
					{
						type: "warning",
						message: "An error occurred while submitting the form. Please refresh the page and try again.",
					},
				]);

			return;
		}

		const siteKey = window.GOOGLE_RECAPTCHA_SITE_KEY;

		//
		// Get Token
		//

		const token = await new Promise((resolve) =>
		{
			grecaptcha.ready(async function ()
			{
				const token = await grecaptcha.execute(siteKey,
					{
						action: "submit",
					});

				resolve(token);
			});
		}) as string;

		//
		// Remove Existing Input
		//

		options.form.querySelector("input[name=recaptcha_token]")?.remove();

		//
		// Add Input
		//

		const input = document.createElement("input");

		input.type = "hidden";
		input.name = "recaptcha_token";
		input.value = token;

		options.form.appendChild(input);

		console.log("[Form] ReCAPTCHA token:", token);
	}

	//
	// Submit Form
	//

	if (options.form.dataset["ajax"] == "true")
	{
		console.log("[Form] Submitting form via AJAX...");

		const response = await fetch(action,
			{
				method: method,
				body: new FormData(options.form),
				credentials: "include",
			});

		await options.onAjaxSubmissionResponse(response, populateNoticeContainer);
	}
	else
	{
		console.log("[Form] Submitting form via standard method...");

		options.form.method = method;
		options.form.action = action;

		options.form.submit();
	}
}