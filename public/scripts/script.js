const topNavToggler = document.getElementById("topNavToggler");
const topNavList = document.getElementById("topNavList");

topNavToggler.onclick = (event) => {
    topNavList.classList.toggle("active");
};