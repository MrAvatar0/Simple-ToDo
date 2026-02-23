const todos = JSON.parse(localStorage.getItem("todos")) || [];
  
const container = document.getElementById("list");
function renderTodos(todos) {
    container.innerHTML = "";
  
    const sortedTodos = [...todos].sort((a, b) => {
        return a.completed - b.completed;
    });
    sortedTodos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.className = "todo-item";
  

        const textDiv = document.createElement("div");
        textDiv.textContent = todo.text;

        const btn = document.createElement("button");
        btn.textContent = todo.completed ? "Done" : "Not Done";
        btn.className = todo.completed ? "complete" : "not-complete";

        btn.addEventListener("click", () => {
            if (todo.completed == false) todo.completed = !todo.completed;
            else {
                const todoIndex = todos.findIndex(t => t.id === todo.id);
                todos.splice(todoIndex, 1);
            }
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos(todos);
        });
      
        btn.addEventListener("mouseenter", () => {
            if (todo.completed == false) {
                btn.textContent = "Done?";
                btn.style.backgroundColor = "green";
                btn.style.color = "white";
                btn.classList.add("blink");
            } else {
                btn.textContent = "Delete?";
                btn.style.backgroundColor = "red";
                btn.classList.add("blink");
            }
        });
        btn.addEventListener("mouseleave", () => {
            if (todo.completed == false) {
                btn.textContent = "Not Done";
                btn.style.backgroundColor = "yellow";
                btn.style.color = "black";
                btn.classList.remove("blink");
            } else {
                btn.textContent = "Done";
                btn.style.backgroundColor = "green";
                btn.classList.remove("blink");
            }
            
        });
        todoDiv.appendChild(textDiv);
        todoDiv.appendChild(btn);
  
        container.appendChild(todoDiv);
    });
    if (todos.length !== 0) {
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete All";
        delBtn.className = "delBtn";
        container.appendChild(delBtn);
        delBtn.addEventListener("click", () => {
            todos = [];
            localStorage.setItem("todos", JSON.stringify(todos));
            renderTodos(todos);
        });
    }
}
renderTodos(todos);

const addBtn = document.getElementById("addBtn");
const doIn = document.getElementById("doIn");
addBtn.addEventListener("click", () => {
    addNewTask();
});
doIn.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addNewTask();
    }
});

function addNewTask() {
    const value = doIn.value;
    const newTodo = {
        id: Date.now(),
        text: value,
        completed: false
    };
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
    doIn.value = ""; 
}