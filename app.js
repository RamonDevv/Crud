import { getPosts } from "./crud.js";

document.querySelector("#get-values").addEventListener("click", async () => {
    const ul = document.querySelector("#rdata");

    try {
        const posts = await getPosts();
        ul.replaceChildren(); // Clear old results before showing them again

        for (const post of posts) {
            const li = document.createElement("li");
            li.textContent = `${post.title} — ${post.views} views`;
            ul.appendChild(li);
        }
    } catch (error) {
        console.error(error);
        ul.textContent = "Could not load posts.";
    }
});

document.querySelector("#get-values-delete").addEventListener("click", async () => {
    const ul = document.querySelector("#ddata");

    try {
        const posts = await getPosts()
        ul.replaceChildren();

        for (const post of posts) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.textContent = "Delete entry"
            button.type = "submit"
            button.id = "delbtn"
            button.style.backgroundColor = "red"
            button.style.color = "white";
            button.style.padding = "8px 12px";
            button.style.margin = "20px"
            li.textContent = `${post.title} - ${post.views} views`
            ul.appendChild(li)
            li.appendChild(button)
        }
    } catch (error) {
        console.error(error);
        ul.textContent = "Could not load the posts";
    }

})
