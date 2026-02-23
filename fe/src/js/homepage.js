const displayProductName = document.getElementById("displayProductName");

const productName = sessionStorage.getItem("productName");

console.log(productName);
if (displayProductName && productName) {
	displayProductName.textContent = productName;
}
