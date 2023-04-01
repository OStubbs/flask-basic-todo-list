const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

function addTodo() {
    const todo = todoInput.value;
    if (todo.trim()) {
        fetch('/add', {
            method: 'POST',
            body: JSON.stringify({todo: todo}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(data => {
            const li = document.createElement('li');
            li.textContent = todo;
            li.className = 'list-group-item d-flex justify-content-between align-items-center bg-dark text-light';
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'btn btn-danger btn-sm delete-button';
            deleteButton.onclick = () => deleteTodo(data.todos.length - 1);
            
            li.appendChild(deleteButton);
            todoList.appendChild(li);
            todoInput.value = '';
        });
    }
}

function deleteTodo(index) {
    fetch('/delete', {
        method: 'POST',
        body: JSON.stringify({index: index}),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        todoList.innerHTML = '';
        data.todos.forEach((todo, i) => {
            const li = document.createElement('li');
            li.className = "list-group-item d-flex justify-content-between align-items-center bg-dark text-light";
            li.textContent = todo;
            li.onclick = () => deleteTodo(i);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'btn btn-danger btn-sm delete-button';
            deleteButton.onclick = () => deleteTodo(data.todos.length - 1);
            
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    });
}
