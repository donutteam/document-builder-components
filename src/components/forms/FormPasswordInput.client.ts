//
// Component
//

export function initialiseFormPasswordInputs()
{
	const passwordInputs = Array.from(document.querySelectorAll(".component-form-password-input:not(.initialised)")) as HTMLElement[];

	if (passwordInputs.length == 0)
	{
		return;
	}

	console.log("Initialising " + passwordInputs.length + " FormPasswordInput components...");

	for (const passwordInput of passwordInputs)
	{
		passwordInput.classList.add("initialised");

		const input = passwordInput.querySelector("input") as HTMLInputElement;

		const toggle = passwordInput.querySelector(".toggle") as HTMLElement;

		toggle.addEventListener("click", () =>
		{
			const startingType = input.type;

			input.type = startingType == "password" ? "text" : "password";

			toggle.classList.toggle("fa-eye");
			toggle.classList.toggle("fa-eye-slash");
			toggle.setAttribute("title", startingType == "password" ? "Hide password" : "Show password");
		});
	}
}