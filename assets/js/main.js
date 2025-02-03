const taskInput = document.querySelector('.task-input');
const addTaskButton = document.querySelector('.add-task-button');
const tasks = document.querySelector('.tasks');

function createdTask() {
    const task = document.createElement('li');
    return task;
}

taskInput.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) { //o keycode do Enter é 13
        if(!taskInput.value) return;
        createTask(taskInput.value);
    }
})

function cleanInput() {
    taskInput.value = '';
    taskInput.focus();
}

function createDeleteButton(task) {
    task.innerText += '  ';
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'apagar';
    deleteButton.setAttribute('class', 'delete'); //deleteButton receberá classe chamada delete
    task.appendChild(deleteButton);
}

function createTask(inputText) {
    const task = createdTask();
    task.innerText = inputText;
    tasks.appendChild(task);
    cleanInput();
    createDeleteButton(task);
    saveTasks();
};

addTaskButton.addEventListener('click', function() {
    if(!taskInput.value) return; //evita que se o campo estiver em branco, seja enviado 
    createTask(taskInput.value);
});

document.addEventListener('click', function(e) {
     const el = e.target; //captura elemento clicado

     if(el.classList.contains('delete')) {
        el.parentElement.remove(); //se el clicado tiver classe delete, será removido o elemento pai (o li criado)
        saveTasks() // faz com que os dados do localStorage sejam atualizados qndo um item for apagado (não constando mais na lista o item apagado)
     }
})

function saveTasks() {
  const liTasks = tasks.querySelectorAll('li');
  const tasksList = [];

  for (let task of liTasks) {
      const textTask = task.firstChild.textContent.trim(); // Pega apenas o texto da tarefa, sem incluir o botão "apagar"
      tasksList.push(textTask);
  }

  const tasksJSON = JSON.stringify(tasksList);
  localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks'); //recupera da memória do navegador os dados salvos com a chave 'tasks'
    const tasksList = JSON.parse(tasks); //converte novamente para um elemento JS (no caso, um array)

    for (let task of tasksList) {
        createTask(task);
    }
}

addSavedTasks();

//localStorage é como se fosse uma base de dados do navegador