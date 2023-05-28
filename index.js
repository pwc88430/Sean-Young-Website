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



//Retrieves blog posts from blogger.com
const APIKEY = 'AIzaSyD6w4XetHm1i5gpLStd5DT-R73bxK8AFC4';
const blogId = '7338967807836175875';

const HTTPRequest = new XMLHttpRequest();
HTTPRequest.open("GET", 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts?key=' + APIKEY);
HTTPRequest.responseType = 'json';
HTTPRequest.send();

HTTPRequest.onload = () => {
    if (HTTPRequest.readyState == 4 && HTTPRequest.status == 200) {
        const data = HTTPRequest.response;

        console.log(data.items)

        console.log(data.items.length)
        data.items.forEach((item) => {

            const postId = item.id;
            console.log(postId)

            const blogContainerEl = document.getElementById("blog-container");
            const newBlogPost = document.createElement("div");
            const newBlogTitle = document.createElement("h2");
            const newBlogText = document.createElement("p");

            const commentLabel = document.createElement("h3");
            commentLabel.innerHTML = "Comments"
            const commentContainer = document.createElement("div")
            commentContainer.appendChild(commentLabel)
            commentContainer.classList.add("blog-post-comment-container")

            const commentRequest = new XMLHttpRequest();
            commentRequest.open("GET", 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts/' + postId + '/comments?key=' + APIKEY);
            commentRequest.onload = function () {
                var data = JSON.parse(commentRequest.responseText);
                if (commentRequest.readyState == 4 && commentRequest.status == "200") {
                    console.log(data);
                    data.items.forEach((comment) => {
                        console.log(comment.author.displayName + " - " + comment.content)
                        const newComment = document.createElement("div")
                        newComment.innerHTML = comment.author.displayName + " - " + comment.content;
                        commentContainer.appendChild(newComment);
                    })
                } else {
                    console.log(`Error: ${commentRequest.status}`);
                }
            };
            commentRequest.send();
            newBlogText.innerHTML = item.content;
            newBlogTitle.innerHTML = item.title;
            newBlogPost.classList.add("blog-post");
            newBlogPost.appendChild(newBlogTitle);
            newBlogPost.appendChild(newBlogText);
            newBlogPost.appendChild(commentContainer);
            blogContainerEl.appendChild(newBlogPost);
        })


    } else {
        console.log(`Error: ${HTTPRequest.status}`);
    }
};











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

window.addEventListener("resize", () => {

    console.log(window.innerWidth)

})

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

///Code for handling login content

let loggedIn = false;

const loginButtonEl = document.getElementById("login-button");

loginButtonEl.addEventListener("click", () => {

    if (loggedIn) {
        loggedIn = false
        console.log(loggedIn)
        loginButtonEl.innerHTML = "Login"
        updateLoggedInContents()
    }
    else {
        loggedIn = true
        console.log(loggedIn)
        loginButtonEl.innerHTML = "logout"
        updateLoggedInContents()
    }

})

function updateLoggedInContents() {

    const mediaContainerEl = document.getElementById("media-container")

    if (loggedIn) {

        const loggedOutRestrictionEl = document.getElementById("logged-out-restriction")

        mediaContainerEl.removeChild(loggedOutRestrictionEl)

    }
    else {
        const loggedOutRestrictionEl = document.createElement("div")
        loggedOutRestrictionEl.id = "logged-out-restriction";
        mediaContainerEl.appendChild(loggedOutRestrictionEl)
    }





}





