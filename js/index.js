const navBar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-button");
const contentPages = document.querySelectorAll(".content");
const navMarkerEl = document.querySelector(".nav-marker");
navMarkerEl.style.visibility = "hidden";
let activeNavId = "home";

updateNavMarker(activeNavId)

navBar.addEventListener("click", (event) => {
    const id = event.target.dataset.id;


    if (id) {
        navLinks.forEach((btn) => {
            btn.classList.remove("live")
        })
        event.target.classList.add("live")

        contentPages.forEach((page) => {
            page.classList.remove("live");
        });

        const element = document.getElementById(id + "-container");
        element.classList.add("live");

        //updateNavMarker(id);
    }
})






function updateNavMarker(id) {

    activeNavId = id;
    const currentLink = document.querySelector("[data-id=" + id + "]");

    navMarkerEl.style.visibility = "visible";

    const xPos = currentLink.offsetLeft;

    const yPos = currentLink.offsetTop;

    const width = currentLink.offsetWidth;

    navMarkerEl.style.left = xPos + "px";
    navMarkerEl.style.top = (yPos + 9) + "px";
    navMarkerEl.style.width = width + "px";

    setTimeout(() => { navMarkerEl.style.visibility = "hidden"; }, 400)

}














/*window.addEventListener("resize", () => {

    console.log(window.innerWidth)

})
*/















