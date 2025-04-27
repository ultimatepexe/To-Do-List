const taskList: HTMLElement = document.querySelector("ul") as HTMLUListElement;

function toggleTaskState(task: HTMLElement, isEditing: boolean): void {
    const checkbox = task.querySelector(".checkbox") as HTMLInputElement;
    const taskSpan = task.querySelector(".taskSpan") as HTMLSpanElement;
    const editInput = task.querySelector(".editInput") as HTMLInputElement;
    const editButton = task.querySelector(".editButton") as HTMLButtonElement;
    const saveButton = task.querySelector(".saveButton") as HTMLButtonElement;
    const cancelButton = task.querySelector(".cancelButton") as HTMLButtonElement;
    const deleteButton = task.querySelector(".deleteButton") as HTMLButtonElement;

    if (isEditing) {
        checkbox.style.display = "none";
        taskSpan.style.display = "none";
        editInput.style.display = "inline";
        editButton.style.display = "none";
        saveButton.style.display = "inline";
        cancelButton.style.display = "inline";
        deleteButton.style.display = "none";
    } else {
        checkbox.style.display = "inline";
        taskSpan.style.display = "inline";
        editInput.style.display = "none";
        editButton.style.display = "inline";
        saveButton.style.display = "none";
        cancelButton.style.display = "none";
        deleteButton.style.display = "inline";
    }
}

function addTask(): void {
    const newTask = document.querySelector("input")?.value.trim() as string;
    if (!newTask) return

    const task = document.createElement("li");
    task.style.listStyle = "none";
    
    const checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.type = "checkbox";

    const taskSpan = document.createElement("span");
    taskSpan.className = "taskSpan";
    taskSpan.textContent = newTask;
    
    const editInput = document.createElement("input");
    editInput.className = "editInput";
    editInput.style.display = "none";
    editInput.type = "text";

    const editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.textContent = "Edit";
    
    const saveButton = document.createElement("button");
    saveButton.className = "saveButton";
    saveButton.style.display = "none";
    saveButton.textContent = "Save";

    const cancelButton = document.createElement("button");
    cancelButton.className = "cancelButton";
    cancelButton.style.display = "none";
    cancelButton.textContent = "Cancel";

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "Delete";

    task.appendChild(checkbox);
    task.appendChild(taskSpan);
    task.appendChild(editInput);
    task.appendChild(editButton);
    task.appendChild(saveButton);
    task.appendChild(cancelButton);
    task.appendChild(deleteButton);
    taskList.appendChild(task);
    
    document.querySelector("input")!.value = "";

    checkbox.addEventListener("click", () => toggleComplete(task));
    editButton.addEventListener("click", () => editTask(task));
    saveButton.addEventListener("click", () => saveEdit(task));
    cancelButton.addEventListener("click", () => cancelEdit(task));
    deleteButton.addEventListener("click", () => task.remove());

    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveEdit(task);
        }
    })
}

function toggleComplete(task: HTMLElement): void {
    const checkbox = task.querySelector(".checkbox") as HTMLInputElement;
    const editButton = task.querySelector(".editButton") as HTMLButtonElement;
    
    if (checkbox!.checked) {
        editButton!.style.display = "none";
        task.classList.add("completed");
    } else {
        editButton!.style.display = "inline";
        task.classList.remove("completed");
    }
}

function editTask(task: HTMLElement): void {
    const taskSpan = task.querySelector(".taskSpan") as HTMLSpanElement;
    const editInput = task.querySelector(".editInput") as HTMLInputElement;

    editInput.value = taskSpan.textContent as string;

    toggleTaskState(task, true)
}

function cancelEdit(task: HTMLElement): void {
    toggleTaskState(task, false);
}

function saveEdit(task: HTMLElement): void {
    const editInput = task.querySelector(".editInput") as HTMLInputElement;
    const taskSpan = task.querySelector(".taskSpan") as HTMLSpanElement;

    const newTask = editInput.value.trim();

    if (newTask) {taskSpan.textContent = newTask;}

    toggleTaskState(task, false)
}

document.querySelector("input")?.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        addTask()
    }
})