//
// Locals
//

function initialisePasswordInput(passwordInput: HTMLElement)
{
	const input = passwordInput.querySelector("input") as HTMLInputElement;

	const toggle = passwordInput.querySelector(".toggle") as HTMLElement;

	toggle.addEventListener("click", 
		() =>
		{
			const startingType = input.type;

			input.type = startingType == "password" ? "text" : "password";

			toggle.classList.toggle("fa-eye");
			toggle.classList.toggle("fa-eye-slash");
			toggle.setAttribute("title", startingType == "password" ? "Hide password" : "Show password");
		});

	passwordInput.classList.add("initialised");
}

//
// Component
//

export function initialisePasswordInputs()
{
	const passwordInputs = document.querySelectorAll<HTMLElement>(".component-password-input:not(.initialised)");

	console.log("[PasswordInput] Initialising " + passwordInputs.length + " instances...");

	for (const passwordInput of passwordInputs)
	{
		try
		{
			initialisePasswordInput(passwordInput);
		}
		catch (error)
		{
			console.error("[PasswordInput] Error initialising:", passwordInput, error);
		}
	}
}