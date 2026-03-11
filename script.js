let todos = JSON.parse(localStorage.getItem('todos')) || []

let currentPage = 1
let todosPerPage = 3


function renderTodos(list = todos){
    const todoList = document.getElementById('todoList')
    todoList.innerHTML = ''


    if(list.length === 0){
        todoList.innerHTML = `
        <li class="list-group-item text-center text-muted">
        <i class="bi bi-inbox"></i>There is no task here </li>
        `
        return
    }


    let start = (currentPage - 1) * todosPerPage
    let end = start + todosPerPage

    let paginatedTodos = list.slice(start,end)

    paginatedTodos.forEach((todo, index)=>{
        let realIndex = start + index
        let li = document.createElement('li')
        li.classList.add("list-group-item", "fade-task")
        li.className="list-group-item fade-task d-flex justify-content-between align-items-center"
        li.innerHTML = `
            <span onclick="toggleComplete(${realIndex})" class="${todo.completed?'completed': ''}">
            ${todo.text}
            </span>

            <div>
                <button class="btn btn-warning btn-sm" onclick="editTodo(${realIndex})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTodo(${realIndex})">Delete</button>
            </div>
        `
        todoList.appendChild(li)
        
    })

    localStorage.setItem("todos", JSON.stringify(todos))
    renderPagination()
}

function renderPagination(){
    const pageContainer = document.getElementById('pagination')
    pageContainer.innerHTML = ""
    let totalPages = Math.ceil(todos.length / todosPerPage)
    for(let i=1; i<=totalPages;i++){
        let btn = document.createElement("button")
        btn.className = `btn btn-sm ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'} me-1`
        btn.innerText = i

        btn.onclick = () => {
            currentPage = i
            renderTodos()
        }

        pageContainer.appendChild(btn)
    }
}



function addTodos(){
    let input = document.getElementById("todoInput")
    let text = input.value.trim()

    if(text === '') {
        alert("Please enter a task")
        return
    }
    todos.push({text:text, completed:false})

    input.value = ''

    renderTodos()
}

function deleteTodo(index){
    todos.splice(index, 1)
    renderTodos()
}

function editTodo(index){
    let newText = prompt("Edit Task", todos[index].text)
    if(newText !== null && newText.trim() !== ''){
        todos[index].text = newText
        renderTodos()
    }
}

function toggleComplete(index){
   todos[index].completed = !todos[index].completed
    renderTodos()
}

function searchTodo(){
    let searchValue = document.getElementById('searchInput').value.toLowerCase()
    let filtered = todos.filter(todo=>
        todo.text.toLowerCase().includes(searchValue)
    )
    renderTodos(filtered)
}

renderTodos()