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
        task.classList.add('completed');
    }

    tasks.appendChild(task);
    cleanInput();
    createDeleteButton(task);
    createCompleteButton(task);
    createEditButton(task); // Adicionando botão de edição
    saveTasks();
}

// 4️. Função para criar botão "Apagar" e remover a tarefa
function createDeleteButton(task) {
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

// 6️. Função para criar botão "Editar" e permitir edição da tarefa
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
    
    // Criando um input para edição
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('edit-input');
    
    // Substituir o texto pelo input
    task.innerHTML = '';
    task.appendChild(input);
    input.focus();

    // Criar botão de salvar
    const saveButton = document.createElement('button');
    saveButton.innerText = '💾';
    saveButton.setAttribute('class', 'save');

    saveButton.addEventListener('click', function () {
        saveEditedTask(task, input);
    });

    // Salvar ao pressionar "Enter"
    input.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            saveEditedTask(task, input);
        }
    });

    task.appendChild(saveButton);
}

function saveEditedTask(task, input) {
    const newText = input.value.trim();
    if (newText === '') return; // Impede salvar uma tarefa vazia

    task.innerText = newText; // Define o novo texto
    createDeleteButton(task);
    createCompleteButton(task);
    createEditButton(task); // Recria os botões
    
    saveTasks(); // Atualiza o localStorage
}


// 7️. Limpa o campo de entrada após adicionar uma tarefa
function cleanInput() {
    taskInput.value = '';
    taskInput.focus();
}

// 8️. Salva todas as tarefas no localStorage
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

// 9️. Recupera e recria as tarefas ao carregar a página
function addSavedTasks() {
    const tasksStorage = localStorage.getItem('tasks');
    if (!tasksStorage) return;

    const tasksList = JSON.parse(tasksStorage);

    for (let task of tasksList) {
        createTask(task.text, task.completed);
    }
}

// 10. Adiciona tarefa ao clicar no botão
addTaskButton.addEventListener('click', function() {
    if (!taskInput.value) return;  
    createTask(taskInput.value);
});

// 11. Adiciona tarefa ao pressionar "Enter"
taskInput.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) { 
        if (!taskInput.value) return;
        createTask(taskInput.value);
    }
});

// 12. Remove tarefa ao clicar no botão "Apagar"
document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('delete')) {
        el.parentElement.remove(); 
        saveTasks();
    }
});

// 13. Chamada inicial para carregar tarefas salvas
addSavedTasks();