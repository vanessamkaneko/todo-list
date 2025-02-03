// 1️. Selecionando elementos do DOM
const taskInput = document.querySelector('.task-input');
const addTaskButton = document.querySelector('.add-task-button');
const tasks = document.querySelector('.tasks');

// 2️. Função para criar uma tarefa (elemento <li>)
function createTaskElement() {
    return document.createElement('li');
}

// 3️. Função para criar uma nova tarefa e adicioná-la à lista
function createTask(inputText, completed = false) {
    const task = createTaskElement();
    task.innerText = inputText;

    if (completed) {
        task.classList.add('completed'); // Se já estava concluída, adiciona a classe
    }

    tasks.appendChild(task);
    cleanInput();
    createDeleteButton(task);
    createCompleteButton(task);
    saveTasks();
}

// 4️. Função para criar botão "Apagar" e remover a tarefa
function createDeleteButton(task) {
    task.innerText += '  ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = '🗑️';
    deleteButton.setAttribute('class', 'delete'); 
    task.appendChild(deleteButton);
}

// 5️. Função para criar botão "Concluir" e marcar/desmarcar a tarefa como concluída
function createCompleteButton(task) {
    const completeButton = document.createElement('button');
    completeButton.innerText = '✅';
    completeButton.setAttribute('class', 'complete');

    completeButton.addEventListener('click', function () {
        task.classList.toggle('completed'); // Marca ou desmarca como concluída
        saveTasks();
    });

    task.appendChild(completeButton);
}

// 6️. Limpa o campo de entrada após adicionar uma tarefa
function cleanInput() {
    taskInput.value = '';
    taskInput.focus();
}

// 7️. Salva todas as tarefas no localStorage
function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const tasksList = [];

    for (let task of liTasks) {
        tasksList.push({
            text: task.firstChild.textContent.trim(), // Apenas o texto
            completed: task.classList.contains('completed'), // Estado concluído
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasksList));
}

// 8️. Recupera e recria as tarefas ao carregar a página
function addSavedTasks() {
    const tasksStorage = localStorage.getItem('tasks');
    if (!tasksStorage) return;

    const tasksList = JSON.parse(tasksStorage);

    for (let task of tasksList) {
        createTask(task.text, task.completed);
    }
}

// 9️. Adiciona tarefa ao clicar no botão
addTaskButton.addEventListener('click', function() {
    if (!taskInput.value) return;  
    createTask(taskInput.value);
});

// 10. Adiciona tarefa ao pressionar "Enter"
taskInput.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) { 
        if (!taskInput.value) return;
        createTask(taskInput.value);
    }
});

// 1️1. Remove tarefa ao clicar no botão "Apagar"
document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('delete')) {
        el.parentElement.remove(); 
        saveTasks();
    }
});

// 1️2. Chamada inicial para carregar tarefas salvas
addSavedTasks();
