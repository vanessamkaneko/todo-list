const taskInput = document.querySelector('.task-input');
const addTaskButton = document.querySelector('.add-task-button');
const tasks = document.querySelector('.tasks');

function createTaskElement() {
    return document.createElement('li');
}

function createTask(inputText, completed = false) {
    const task = createTaskElement();
    task.innerText = inputText;

    if (completed) {
        task.classList.add('completed');
    }

    tasks.appendChild(task);
    cleanInput();
    createDeleteButton(task);
    createCompleteButton(task);
    createEditButton(task);
    saveTasks();
}

function createDeleteButton(task) {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '🗑️';
    deleteButton.setAttribute('class', 'delete'); 
    task.appendChild(deleteButton);
}

function createCompleteButton(task) {
    const completeButton = document.createElement('button');
    completeButton.innerText = '✅';
    completeButton.setAttribute('class', 'complete');

    completeButton.addEventListener('click', function () {
        task.classList.toggle('completed'); 
        saveTasks();
    });

    task.appendChild(completeButton);
}

function createEditButton(task) {
    const editButton = document.createElement('button');
    editButton.innerText = '✏️';
    editButton.setAttribute('class', 'edit');

    editButton.addEventListener('click', function () {
        editTask(task);
    });

    task.appendChild(editButton);

}

function editTask(task) {
    const currentText = task.firstChild.textContent.trim();
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('edit-input');
    
    task.innerHTML = '';
    task.appendChild(input);
    input.focus();

    const saveButton = document.createElement('button');
    saveButton.innerText = '💾';
    saveButton.setAttribute('class', 'save');

    saveButton.addEventListener('click', function () {
        saveEditedTask(task, input);
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            saveEditedTask(task, input);
        }
    });

    task.appendChild(saveButton);
}

function saveEditedTask(task, input) {
    const newText = input.value.trim();
    if (newText === '') return;

    task.innerText = newText; 
    createDeleteButton(task);
    createCompleteButton(task);
    createEditButton(task); 
    
    saveTasks(); 
}

function cleanInput() {
    taskInput.value = '';
    taskInput.focus();
}

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const tasksList = [];

    for (let task of liTasks) {
        tasksList.push({
            text: task.firstChild.textContent.trim(),
            completed: task.classList.contains('completed'), 
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

function addSavedTasks() {
    const tasksStorage = localStorage.getItem('tasks');
    if (!tasksStorage) return;

    const tasksList = JSON.parse(tasksStorage);

    for (let task of tasksList) {
        createTask(task.text, task.completed);
    }
}

addTaskButton.addEventListener('click', function() {
    if (!taskInput.value) return;  
    createTask(taskInput.value);
});

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') { 
        if (!taskInput.value) return;
        createTask(taskInput.value);
    }
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('delete')) {
        el.parentElement.remove(); 
        saveTasks();
    }
});

addSavedTasks();