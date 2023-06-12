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

        //creates each post
        data.items.forEach((post) => {

            //creating elements for new blog post
            const blogContainerEl = document.getElementById("blog-container")

            const blogPost = document.createElement("div");
            blogPost.classList.add("blog-post");

            const blogTitle = document.createElement("h1")
            blogTitle.innerHTML = post.title;
            blogPost.appendChild(blogTitle)

            const timeStamp = document.createElement("div")
            timeStamp.id = "time-stamp"
            timeStamp.innerHTML = post.published.slice(0, 10)
            blogPost.appendChild(timeStamp)

            const divider1 = document.createElement("div")
            divider1.classList.add("divider")
            blogPost.appendChild(divider1);

            const postBodyEl = document.createElement("p")
            postBodyEl.innerHTML = post.content;
            postBodyEl.id = "blog-post-body-text"
            blogPost.appendChild(postBodyEl);

            const postSigniture = document.createElement("div")
            postSigniture.id = "post-signiture"
            postSigniture.innerHTML = "- Mary Sean Young";
            blogPost.appendChild(postSigniture)

            const divider2 = document.createElement("div")
            divider2.classList.add("divider")
            blogPost.appendChild(divider2)

            const photoContainerEl = document.createElement("div");
            photoContainerEl.classList.add("photo-container")
            photoContainerEl.innerHTML = "Photos"
            blogPost.appendChild(photoContainerEl)

            const divider3 = document.createElement("div")
            divider3.classList.add("divider")
            blogPost.appendChild(divider3)

            const commentContainerEl = document.createElement("div")
            commentContainerEl.classList.add("comment-container")
            commentContainerEl.innerHTML = "Comments"
            blogPost.appendChild(commentContainerEl)

            const postId = post.id;

            console.log(post)

            //making a request to get all comments on this post
            const commentRequest = new XMLHttpRequest();
            commentRequest.open("GET", 'https://www.googleapis.com/blogger/v3/blogs/' + blogId + '/posts/' + postId + '/comments?key=' + APIKEY);
            commentRequest.responseType = 'json'
            commentRequest.send();

            commentRequest.onload = function () {


                const commentData = commentRequest.response
                console.log(commentData.items)
                const innerCommentContainer = document.createElement("div")


                //if the request is good, fill the comment containers with comments
                if (commentRequest.readyState == 4 && commentRequest.status == "200") {


                    const postCommentButton = document.createElement("a")
                    postCommentButton.id = "blog-post-comment-button"
                    postCommentButton.innerHTML = "Post Comment"
                    postCommentButton.href = post.url;
                    postCommentButton.target = "_blank"


                    //ignores posts that contain no comments
                    if (commentData.items != undefined) {

                        commentData.items.forEach((comment) => {



                            const newComment = document.createElement("div")
                            newComment.id = "blog-post-comment"

                            const name = comment.author.displayName;

                            const commentContent = comment.content;



                            newComment.innerHTML = name + ' - ' + commentContent

                            innerCommentContainer.appendChild(newComment)
                        })
                        innerCommentContainer.appendChild(postCommentButton)
                        commentContainerEl.addEventListener("click", () => {

                            if (commentContainerEl.contains(innerCommentContainer)) {
                                commentContainerEl.removeChild(innerCommentContainer)
                            }
                            else {
                                commentContainerEl.appendChild(innerCommentContainer)
                            }
                        })
                        //for posts that do not contain any comments
                    } else {
                        const noCommentLabel = document.createElement("div")
                        noCommentLabel.id = "blog-post-no-comment-label"
                        noCommentLabel.innerHTML = "No comments"
                        commentContainerEl.addEventListener("click", () => {
                            if (commentContainerEl.contains(noCommentLabel)) {
                                commentContainerEl.removeChild(noCommentLabel)
                                commentContainerEl.removeChild(postCommentButton)
                            }
                            else {
                                commentContainerEl.appendChild(noCommentLabel)
                                commentContainerEl.appendChild(postCommentButton)
                            }
                        })
                    }
                } else {
                    console.log(`Error: ${commentRequest.status}`)
                }
            }
            //adds the new blog post to the blog container
            blogContainerEl.appendChild(blogPost)
        })

    } else {
        console.log(`Error: ${HTTPRequest.status}`);
    }
}
// code to add event listener to photo container

/*const photoContainerEl = document.querySelector(".photo-container");

const newPhotoEl = document.createElement("div")

let photoOpen = false

photoContainerEl.addEventListener("click", () => {

    if (photoOpen) {
        photoContainerEl.removeChild(newPhotoEl)
        photoOpen = false;
    }
    else {
        photoContainerEl.appendChild(newPhotoEl)
        photoOpen = true
    }


})


//code to add event listener to comment container

const commentContainerEl = document.querySelector(".comment-container");

const postCommentButtonEl = document.createElement("a")
postCommentButtonEl.innerHTML = "Post New Comment"

const newCommentEl = document.createElement("div")

let commentOpen = false;

commentContainerEl.addEventListener("click", () => {

    if (commentOpen) {
        commentContainerEl.removeChild(newCommentEl)
        commentContainerEl.removeChild(postCommentButtonEl);
        commentOpen = false
    }
    else {
        commentContainerEl.appendChild(newCommentEl)
        commentContainerEl.appendChild(postCommentButtonEl)
        commentOpen = true;
    }

})
*/