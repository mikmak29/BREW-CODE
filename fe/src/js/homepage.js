const navUsername = document.getElementById("navUsername");

const path = "/user";
const retrieveUserInfo = async () => {
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
	if (navUsername && data.details?.data?.fullName) {
		navUsername.textContent = data.details.data.fullName;
	}
};

retrieveUserInfo();
