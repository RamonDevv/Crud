const API_URL = "http://localhost:3000/posts";

/**
 * Shared fetch layer. Builds the URL, sends JSON and throws on any non-2xx
 * response so every CRUD function below can `await` without checking `ok`.
 */
async function request(path = "", options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });

  if (!response.ok) {
    throw new Error(`${options.method || "GET"} ${path || "/"} failed: ${response.status} ${response.statusText}`);
  }

  return response.status === 204 ? null : response.json();
}

// CREATE -> POST /posts
export function createPost({ title, views = 0 }) {
  if (!title) throw new Error("createPost: a title is required");
  return request("", { method: "POST", body: JSON.stringify({ title, views }) });
}

// READ -> GET /posts  (all) or GET /posts/:id  (one)
export function getPosts() {
  return request();
}

export function getPost(id) {
  return request(`/${id}`);
}

// UPDATE -> PUT /posts/:id
export function updatePost(id, changes) {
  return request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, ...changes })
  });
}

// DELETE -> DELETE /posts/:id
export function deletePost(id) {
  return request(`/${id}`, { method: "DELETE" });
}

// Smoke test so you can confirm the server is up. Delete this once your
// frontend has its own init.
export async function main() {
  try {
    console.table(await getPosts());
  } catch (error) {
    console.error(error.message);
  }
}

