// Selectors
const todoText = document.getElementById("todoText");
const todoImages = document.getElementById("todoImages");
const borderColor = document.getElementById("borderColor");
const addTodo = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

// Modal for Preview
const modal = document.getElementById("previewModal");
const closeModal = document.getElementById("closeModal");
const previewImages = document.getElementById("previewImages");

// Drag-and-Drop Image Area
const dropArea = document.getElementById("dropArea");
const addImageBtn = document.getElementById("addImageBtn");

// GitHub Configuration
const GITHUB_USERNAME = "0dlan";
const GITHUB_REPO = "HamizzaAwards_2.0";
const token = process.env.GITHUB_TOKEN;
const GITHUB_FILE_PATH = "to do list hh/hh.json";

// Fetch Todos
async function fetchTodos() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
      {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { todos: JSON.parse(atob(data.content)), sha: data.sha };
    } else if (response.status === 404) {
      return { todos: [], sha: null }; // File doesn't exist yet
    } else {
      console.error("Error fetching todos:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
  return { todos: [], sha: null };
}

// Save Todos
async function updateTodosOnGitHub(todos, sha) {
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(todos, null, 2)))); // Encode Unicode safely
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Updated to-do list",
            content,
            sha,
          }),
        }
      );
      if (!response.ok) {
        console.error("Error updating todos:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  }
  
// Render Todos
function renderTodos(todos) {
  todoList.innerHTML = "";
  todos
    .filter((todo) => !todo.deleted)
    .forEach((todo) => addTodoToDOM(todo));
}

// Add a To-Do to the DOM
function addTodoToDOM(todo) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.style.borderLeft = `4px solid ${todo.color || "blue"}`; // Border Color

  // Add Image Preview (if images exist)
  if (todo.images && todo.images.length > 0) {
    const img = document.createElement("img");
    img.src = todo.images[0]; // Show the first image as thumbnail
    img.alt = todo.text;
    img.classList.add("todo-thumbnail");
    img.addEventListener("click", () => {
      // Open Modal with all images
      previewImages.innerHTML = todo.images
        .map(
          (src) =>
            `<img src="${src}" alt="Preview Image" style="width: 100%; margin-bottom: 10px;">`
        )
        .join("");
      modal.style.display = "flex";
    });
    todoItem.appendChild(img);
  }

  // Add Text
  const text = document.createElement("span");
  text.classList.add("todo-item-text");
  text.textContent = todo.text;
  todoItem.appendChild(text);

  // Add Check Button
  const checkButton = document.createElement("button");
  checkButton.classList.add("check-btn");
  checkButton.textContent = todo.checked ? "✔" : "☑";
  checkButton.addEventListener("click", async () => {
    todo.checked = !todo.checked;
    todo.color = todo.checked ? "green" : "blue"; // Change color based on status
    const { todos, sha } = await fetchTodos();
    const index = todos.findIndex((t) => t.text === todo.text);
    todos[index] = todo;
    await updateTodosOnGitHub(todos, sha);
    renderTodos(todos);
  });
  todoItem.appendChild(checkButton);

  // Add Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", async () => {
    todo.deleted = true;
    const { todos, sha } = await fetchTodos();
    const index = todos.findIndex((t) => t.text === todo.text);
    todos[index] = todo;
    await updateTodosOnGitHub(todos, sha);
    renderTodos(todos);
  });
  todoItem.appendChild(deleteButton);

  todoList.appendChild(todoItem);
}

// Add Event Listener for Adding a To-Do
addTodo.addEventListener("click", async () => {
  const textValue = todoText.value.trim();
  const selectedColor = borderColor.value;

  // Validation
  if (!textValue) {
    alert("Please enter a task description!");
    return;
  }

  const images = [];
  if (todoImages.files.length > 0) {
    for (const file of todoImages.files) {
      const reader = new FileReader();
      reader.onload = () => {
        images.push(reader.result);

        // Only add the to-do after processing all images
        if (images.length === todoImages.files.length) {
          createNewTodo(textValue, images, selectedColor);
        }
      };
      reader.readAsDataURL(file);
    }
  } else {
    createNewTodo(textValue, images, selectedColor);
  }
});

async function createNewTodo(textValue, images, color) {
  const { todos, sha } = await fetchTodos();

  const newTodo = {
    text: textValue,
    images: images || [],
    color: color || "blue", // Default color
    checked: false,
    deleted: false,
  };
  todos.push(newTodo);

  await updateTodosOnGitHub(todos, sha);
  renderTodos(todos);

  todoText.value = "";
  todoImages.value = "";
}

// Close Modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Drag-and-Drop Image Functionality
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("dragover");

  const files = e.dataTransfer.files;
  todoImages.files = files;
});

addImageBtn.addEventListener("click", () => {
  todoImages.click();
});

// Load Todos on Page Load
document.addEventListener("DOMContentLoaded", async () => {
  const { todos } = await fetchTodos();
  renderTodos(todos);
});
