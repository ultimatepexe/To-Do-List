const taskList = document.getElementById("taskList")

function addTask() {
    const newTask = document.getElementById("taskInput").value.trim()
    if (newTask === "") {return}

    const li = document.createElement("li")
    li.style.listStyle = "none"
    
    const checkbox = document.createElement("input")
    checkbox.className = "checkbox"
    checkbox.type = "checkbox"

    const taskSpan = document.createElement("span")
    taskSpan.className = "taskSpan"
    taskSpan.textContent = newTask
    
    const editInput = document.createElement("input")
    editInput.className = "editInput"
    editInput.style.display = "none"
    editInput.type = "text"

    const editButton = document.createElement("button")
    editButton.className = "editButton"
    editButton.textContent = "Edit"
    
    const saveButton = document.createElement("button")
    saveButton.className = "saveButton"
    saveButton.style.display = "none"
    saveButton.textContent = "Save"

    const deleteButton = document.createElement("button")
    deleteButton.className = "deleteButton"
    deleteButton.textContent = "Delete"

    li.appendChild(checkbox)
    li.appendChild(taskSpan)
    li.appendChild(editInput)
    li.appendChild(editButton)
    li.appendChild(saveButton)
    li.appendChild(deleteButton)

    taskList.appendChild(li)

    document.getElementById("taskInput").value = ""

    checkbox.addEventListener("click", () => toggleComplete(li))
    editButton.addEventListener("click", () => editTask(li))
    saveButton.addEventListener("click", () => saveEdit(li))
    deleteButton.addEventListener("click", () => deleteTask(li))
}

function toggleComplete(li) {
    const checkbox = li.querySelector(".checkbox")
    const editButton = li.querySelector(".editButton")
    
    if (checkbox.checked) {
        editButton.style.display = "none"
        li.classList.add("completed")
    } else {
        editButton.style.display = "inline"
        li.classList.remove("completed")
    }
    
}

function editTask(li) {
    const checkbox = li.querySelector(".checkbox")
    const taskSpan = li.querySelector(".taskSpan")
    const editInput = li.querySelector(".editInput")
    const editButton = li.querySelector(".editButton")
    const saveButton = li.querySelector(".saveButton")
    const deleteButton = li.querySelector(".deleteButton")
    
    editInput.value = taskSpan.textContent

    checkbox.style.display = "none"
    taskSpan.style.display = "none"
    editInput.style.display = "inline"
    editButton.style.display = "none"
    saveButton.style.display = "inline"
    deleteButton.style.display = "none"
}

function saveEdit(li) {
    let newTask = li.querySelector(".editInput").value.trim()
    const checkbox = li.querySelector(".checkbox")
    const taskSpan = li.querySelector(".taskSpan")
    const editInput = li.querySelector(".editInput")
    const editButton = li.querySelector(".editButton")
    const saveButton = li.querySelector(".saveButton")
    const deleteButton = li.querySelector(".deleteButton")


    if (newTask !== "") {
        taskSpan.textContent = newTask
    }
    checkbox.style.display = "inline"
    taskSpan.style.display = "inline"
    editInput.style.display = "none"
    editButton.style.display = "inline"
    saveButton.style.display = "none"
    deleteButton.style.display = "inline"

}

function deleteTask(li) {
    li.remove()
}

document.getElementById("taskInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask()
    }
})