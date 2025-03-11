const topNavToggler = document.getElementById("topNavToggler");
const hamburgerMenu = document.getElementById("hamburgerMenu");
const topNavList = document.getElementById("topNavList");

topNavToggler.onclick = (event) => {
    hamburgerMenu.classList.toggle("active");
    topNavList.classList.toggle("active");
};