// Form elements
const signupFormButton = document.getElementById("signupForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const agreeTerms = document.getElementById("agreeTerms");

// display response error
const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// path
const path = "/user/signup";

const signupFormHandler = async (e) => {
	e.preventDefault();

	// if (!fullName.value.trim() || !email.value.trim() || !password.value.trim() || !agreeTerms.checked) {
	// 	return console.error("All fields are required");
	// }

	if (!fullName.value.trim()) {
		fullName.classList.add("error-focus");
		fullNameError.textContent = "Full Name is required";
		setTimeout(() => {
			fullName.classList.remove("error-focus");
			fullNameError.textContent = "";
		}, 2000);
		return;
	}

	if (!email.value.trim()) {
		email.classList.add("error-focus");
		emailError.textContent = "Email is required";
		setTimeout(() => {
			email.classList.remove("error-focus");
			emailError.textContent = "";
		}, 2000);
		return;
	}

	if (!password.value.trim()) {
		password.classList.add("error-focus");
		passwordError.textContent = "Password is required";
		setTimeout(() => {
			password.classList.remove("error-focus");
			passwordError.textContent = "";
		}, 2000);
		return;
	}

	if (!agreeTerms.checked) {
		return;
	}

	const userData = {
		fullName: fullName.value.trim(),
		email: email.value.trim(),
		password: password.value.trim(),
		agreeTerms: agreeTerms.checked,
	};

	const response = await fetch(`http://localhost:3000/api${path}`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify(userData),
	});

	if (!response.ok) {
		const error = await response.json();
		console.error(error.details.errorMessage);
		return;
	}

	const data = await response.json();

	console.log(`Signup: ${data.details.message}`);

	window.location.href = "./login.html";

	fullName.value = "";
	email.value = "";
	password.value = "";
	agreeTerms.checked = "";
};

signupFormButton?.addEventListener("submit", signupFormHandler);
