import { getPosts, createPost, deletePost, updatePost } from "./crud.js";

function createdata() {
    document.querySelector("#Cbutton").addEventListener("click", async () => {
        const title = document.getElementById("Ctitle").value;
        const views = Number(document.getElementById("Cviews").value) || 0;

        try {
            const post = await createPost({ title, views });
            console.log(post)
        } catch (error) {
            console.error(error)
        }
    })
}
createdata()

//#region  Read
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
//#endregion

//#region Update
document.querySelector("#get-values-update").addEventListener("click", async () => {
  const ul = document.querySelector("#Udata");

  try {
    const posts = await getPosts();
    ul.replaceChildren();

    for (const post of posts) {
      const li = document.createElement("li");

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.placeholder = "Title";
      titleInput.value = post.title;

      const viewsInput = document.createElement("input");
      viewsInput.type = "number";
      viewsInput.placeholder = "Views";
      viewsInput.value = post.views;

      const button = document.createElement("button");
      button.textContent = "Update entry";
      button.type = "button";
      button.className = "entry-btn entry-btn--update";

      button.addEventListener("click", async () => {
        const title = titleInput.value.trim();
        const views = Number(viewsInput.value);

        if (!title) {
          console.error("Title is required.");
          return;
        }

        try {
          await updatePost(post.id, { title, views });
          console.log(`Updated post ${post.id}`);
        } catch (error) {
          console.error(error);
        }
      });

      li.append(
        document.createTextNode(`${post.title} — ${post.views} views `),
        titleInput,
        viewsInput,
        button
      );

      ul.appendChild(li);
    }
  } catch (error) {
    console.error(error);
    ul.textContent = "Could not load the posts";
  }
});
//#endregion

//#region Delete
document.querySelector("#get-values-delete").addEventListener("click", async () => {
    const ul = document.querySelector("#ddata");
    try {
        const posts = await getPosts()
        ul.replaceChildren();

        for (const post of posts) {
            const li = document.createElement("li");
            const button = document.createElement("button");
            button.textContent = "Delete entry"
            button.type = "button"
            button.id = "delbtn"
            button.className = "entry-btn entry-btn--delete";
            button.addEventListener("click", async () => {
                try {
                    await deletePost(post.id);
                    li.remove();
                } catch (error) {
                    console.error(error);
                }
            });
            li.textContent = `${post.title} - ${post.views} views`
            ul.appendChild(li)
            li.appendChild(button)
        }
    } catch (error) {
        console.error(error);
        ul.textContent = "Could not load the posts";
    }

})
//#endregion


