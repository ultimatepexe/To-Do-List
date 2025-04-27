"use strict";
const taskList = document.querySelector("ul");
function toggleTaskState(task, isEditing) {
    const checkbox = task.querySelector(".checkbox");
    const taskSpan = task.querySelector(".taskSpan");
    const editInput = task.querySelector(".editInput");
    const editButton = task.querySelector(".editButton");
    const saveButton = task.querySelector(".saveButton");
    const cancelButton = task.querySelector(".cancelButton");
    const deleteButton = task.querySelector(".deleteButton");
    if (isEditing) {
        checkbox.style.display = "none";
        taskSpan.style.display = "none";
        editInput.style.display = "inline";
        editButton.style.display = "none";
        saveButton.style.display = "inline";
        cancelButton.style.display = "inline";
        deleteButton.style.display = "none";
    }
    else {
        checkbox.style.display = "inline";
        taskSpan.style.display = "inline";
        editInput.style.display = "none";
        editButton.style.display = "inline";
        saveButton.style.display = "none";
        cancelButton.style.display = "none";
        deleteButton.style.display = "inline";
    }
}
function addTask() {
    var _a;
    const newTask = (_a = document.querySelector("input")) === null || _a === void 0 ? void 0 : _a.value.trim();
    if (!newTask)
        return;
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
    document.querySelector("input").value = "";
    checkbox.addEventListener("click", () => toggleComplete(task));
    editButton.addEventListener("click", () => editTask(task));
    saveButton.addEventListener("click", () => saveEdit(task));
    cancelButton.addEventListener("click", () => cancelEdit(task));
    deleteButton.addEventListener("click", () => task.remove());
    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveEdit(task);
        }
    });
}
function toggleComplete(task) {
    const checkbox = task.querySelector(".checkbox");
    const editButton = task.querySelector(".editButton");
    if (checkbox.checked) {
        editButton.style.display = "none";
        task.classList.add("completed");
    }
    else {
        editButton.style.display = "inline";
        task.classList.remove("completed");
    }
}
function editTask(task) {
    const taskSpan = task.querySelector(".taskSpan");
    const editInput = task.querySelector(".editInput");
    editInput.value = taskSpan.textContent;
    toggleTaskState(task, true);
}
function cancelEdit(task) {
    toggleTaskState(task, false);
}
function saveEdit(task) {
    const editInput = task.querySelector(".editInput");
    const taskSpan = task.querySelector(".taskSpan");
    const newTask = editInput.value.trim();
    if (newTask) {
        taskSpan.textContent = newTask;
    }
    toggleTaskState(task, false);
}
document.querySelector("input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
