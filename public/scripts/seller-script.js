const addProduct = document.getElementById("addProduct");
const addProductModalClose = document.getElementById("addProductModalClose");
const addProductModal = document.getElementById("addProductModal");

addProduct.onclick = (event) => {
	addProductModal.classList.add("active");
};

addProductModalClose.onclick = (event) => {
	addProductModal.classList.remove("active");
};
