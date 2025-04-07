const topNavToggler = document.getElementById("topNavToggler");
const topNavList = document.getElementById("topNavList");
const topNavListItemDropdownButton = document.getElementById("topNavListItemDropdownButton");
const topNavListItemDropdownList = document.getElementById("topNavListItemDropdownList");

topNavToggler.onclick = (event) => {
	topNavList.classList.toggle("active");
};

topNavListItemDropdownButton.onclick = (event) => {
	topNavListItemDropdownList.classList.toggle("active");
};
