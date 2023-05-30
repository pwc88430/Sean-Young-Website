
//Coding for movie dropdown resume containers
const movieContainerEls = document.querySelector(".resume-movie-dropdowns").querySelectorAll(".resume-dropdown-container");
movieContainerEls.forEach((containerEl) => {
    const resumeEl = document.getElementById("list-movie-" + containerEl.getAttribute('id'));
    const numberOfListElements = resumeEl.querySelectorAll("li").length;
    const heightOfListElement = 18;
    const offset = 55;
    const height = resumeEl.offsetHeight;
    const width = resumeEl.offsetWidth;
    resumeEl.style.display = "none";

    containerEl.addEventListener("click", () => {
        const arrowEl = document.getElementById("arrow-movie-" + containerEl.getAttribute('id'));
        if (containerEl.classList.contains("open")) {
            containerEl.classList.remove("open");
            arrowEl.style.transform = "rotate(180deg)";
            resumeEl.style.display = "none";
            containerEl.style.height = "30px";
            containerEl.style.width = "300px";
            arrowEl.style.left = "150px";
        }
        else {
            containerEl.classList.add("open");
            arrowEl.style.transform = "rotate(90deg)";
            containerEl.style.height = numberOfListElements * heightOfListElement + offset + "px";
            containerEl.style.width = "545px";
            arrowEl.style.left = "390px";
            setTimeout(() => { resumeEl.style.display = "inline"; }, 200);
        };
    });
});

//Coding for tv dropdown resume containers
const tvContainerEls = document.querySelector(".resume-tv-dropdowns").querySelectorAll(".resume-dropdown-container");
tvContainerEls.forEach((containerEl) => {
    const resumeEl = document.getElementById("list-tv-" + containerEl.getAttribute('id'));
    const numberOfListElements = resumeEl.querySelectorAll("li").length;
    const heightOfListElement = 18;
    const offset = 55;
    const height = resumeEl.offsetHeight;
    const width = resumeEl.offsetWidth;
    resumeEl.style.display = "none";

    containerEl.addEventListener("click", () => {
        const arrowEl = document.getElementById("arrow-tv-" + containerEl.getAttribute('id'));
        if (containerEl.classList.contains("open")) {
            containerEl.classList.remove("open");
            arrowEl.style.transform = "rotate(180deg)";
            resumeEl.style.display = "none";
            containerEl.style.height = "30px";
            containerEl.style.width = "300px";
            arrowEl.style.left = "150px";
        }
        else {
            containerEl.classList.add("open");
            arrowEl.style.transform = "rotate(90deg)";
            containerEl.style.height = numberOfListElements * heightOfListElement + offset + "px";
            containerEl.style.width = "545px";
            arrowEl.style.left = "390px";
            setTimeout(() => { resumeEl.style.display = "inline"; }, 200);
        };
    });
});

// Code for expanding all resume dropdowns when checkbox is clicked
const resumeCheckboxEl = document.getElementById("resume-expand-all-checkbox");
let checked = false;
resumeCheckboxEl.addEventListener("click", () => {
    checked = !checked;
    updateDropdowns();
    console.log("clicked")
});



function updateDropdowns() {
    if (checked) {
        movieContainerEls.forEach((container) => {
            if (!container.classList.contains("open")) {
                container.click();
            }
        })
        tvContainerEls.forEach((container) => {
            if (!container.classList.contains("open"))
                container.click();
        })

    }
    else {
        movieContainerEls.forEach((container) => {
            if (container.classList.contains("open")) {
                container.click();
            }
        })
        tvContainerEls.forEach((container) => {
            if (container.classList.contains("open"))
                container.click();
        });
    };
};