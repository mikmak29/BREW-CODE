const navbarName = document.getElementById("navbarName");
const totalProductsEl = document.getElementById("totalProducts");

const path = "/user/admin";

const fetchAdminData = async () => {
	const accessToken = sessionStorage.getItem("accessToken");
	if (!accessToken) {
		window.location.href = "./login.html";
		return;
	}

	const response = await fetch(`http://localhost:8000/api${path}`, {
		headers: { Authorization: `Bearer ${accessToken}` },
		credentials: "include",
	});

	if (!response.ok) {
		window.location.href = "./login.html";
		return;
	}

	const data = await response.json();

	navbarName.textContent = data.details.data.fullName;
	// if (totalProductsEl && data.details?.data) {
	// 	// Populate admin stats when backend returns them
	// 	totalProductsEl.textContent = data.details.data.totalProducts ?? "—";
	// }
};

fetchAdminData();
