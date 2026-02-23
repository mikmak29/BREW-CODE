const product = document.getElementById("product");
const submitForm = document.getElementById("submitForm");
const displayErrorMessageInput = document.getElementById("displayErrorMessageInput");

const path = "/product/create";

const submitFormHandler = async (e) => {
	e.preventDefault();

	if (!product.value) {
		displayErrorMessageInput.textContent = "Field is empty";
		console.log("test");
		return;
	}

	const response = await fetch(`http://localhost:3000/api${path}`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ productName: product.value }),
	});

	if (!response.ok || !product.value) {
		const error = await response.json();
		displayErrorMessageInput.textContent = error.errorMessage;
		return setTimeout(() => {
			displayErrorMessageInput.textContent = "";
		}, 2000);
	}

	const data = await response.json();
	console.log(data);
	sessionStorage.setItem("productName", data.data.productName);

	window.location.href = "./src/pages/homepage.html";

	product.value = "";
};

submitForm?.addEventListener("submit", submitFormHandler);
