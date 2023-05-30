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