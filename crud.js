const db = "http://localhost:3000/posts";

async function main() {
  try {
    const createdResponse = await fetch(db, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "another another another title",
        views: 300
      })
    });

    if (!createdResponse.ok) throw new Error(`POST failed: ${createdResponse.status}`);
    const created = await createdResponse.json();

    const updatedResponse = await fetch(`${db}/3`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "3",
        title: "New title for id 3",
        views: 200
      })
    });

    if (!updatedResponse.ok) throw new Error(`PUT failed: ${updatedResponse.status}`);
    const updated = await updatedResponse.json();

    const deleteResponse = await fetch(`${db}/1`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

      })
    });

    if(!deleteResponse.ok) throw new Error(`DELETE failed: ${deleteResponse.status}`);
    const deleted = await deleteResponse.json();

    console.log("Created:", created.id);
    console.log("Updated:", updated);
    console.log("Delete:", deleted)
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
