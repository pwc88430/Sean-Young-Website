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