const mediaPhotosContainerEl = document.querySelector(".media-photos-container")
const sliderEl = document.getElementById("mediaPictureSizeSlider")
const imageEls = mediaPhotosContainerEl.querySelectorAll("img")



sliderEl.addEventListener("input", () => {
    const value = sliderEl.value;
    imageEls.forEach((image) => {
        image.style.width = value + "px"
        image.style.height = value + "px"
    })
})



const mediaContainerButtonEls = document.querySelector(".media-container-category-buttons")
const categoryCheckBoxEl = document.getElementById("categoryCheckBox")
categoryCheckBoxEl.addEventListener("click", () => {
    if (categoryCheckBoxEl.checked) {

        mediaContainerButtonEls.style.display = "flex"

    }
    else {
        imageEls.forEach((image) => {
            image.style.filter = "brightness(100%)"
        })
        mediaContainerButtonEls.style.display = "none"
    }
})



const mediaSearchInputEl = document.querySelector(".media-search-input")
mediaSearchInputEl.style.display = "none"
const searchCheckBoxEl = document.getElementById("searchCheckBox")
searchCheckBoxEl.addEventListener("click", () => {
    if (searchCheckBoxEl.checked) {
        mediaSearchInputEl.style.display = "flex"
    }
    else {
        mediaSearchInputEl.style.display = "none"
    }
})

const allCategoryButton = document.querySelector(".all-category")
allCategoryButton.addEventListener("click", () => {
    imageEls.forEach((image) => {
        image.style.filter = "brightness(100%)"
    })
})

const photoCategorybutton = document.querySelector(".photos-category")
photoCategorybutton.addEventListener("click", () => {
    imageEls.forEach((image) => {
        if (image.classList.contains("photo")) {
            image.style.filter = "brightness(100%)"
        } else {
            image.style.filter = "brightness(20%)"
        }
    })
})

const posterCategoryButton = document.querySelector(".posters-category")
posterCategoryButton.addEventListener("click", () => {
    imageEls.forEach((image) => {
        if (image.classList.contains("poster")) {
            image.style.filter = "brightness(100%)"
        } else {
            image.style.filter = "brightness(20%)"
        }
    })
})