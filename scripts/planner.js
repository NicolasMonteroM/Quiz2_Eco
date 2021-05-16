const database = firebase.database();

//const toDoListRef = database.ref('Tasks/To Do');

const task = document.getElementById('taskInfo');
const addBtn = document.getElementById('addTask');

const toDoContainer = document.getElementById('toDoContainer');
const doingContainer = document.getElementById('doingContainer');
const doneContainer = document.getElementById('doneContainer');

addBtn.addEventListener('click', function (e) {

    e.preventDefault();
    if (task.value === '') {
        alert("Ingrese la descripción de la tarea");
    } else {

        let reference = database.ref('Tasks/To Do').push();
        let taskDate = new Date();

        let taskObj = {
            id: reference.key,
            description: task.value,
            day: taskDate.getDate(),
            month: taskDate.getMonth(),
            year: taskDate.getFullYear(),
            status: 'to do',
        }

        reference.set(taskObj);
    }
});

database.ref('Tasks/To Do').on('value', function (data) {

    toDoContainer.innerHTML = '';
    data.forEach(taskObj => {
        let valor = taskObj.val();
        let fila = new Task(valor);
        toDoContainer.appendChild(fila.render());

    }
    );
})

database.ref('Tasks/Doing').on('value', function (data) {
    doingContainer.innerHTML = '';
    data.forEach(taskObj => {
        let valor = taskObj.val();
        let fila = new Doing(valor);
        doingContainer.appendChild(fila.render());
    }
    );
})

database.ref('Tasks/Done').on('value', function (data) {
    doneContainer.innerHTML = '';
    data.forEach(taskObj => {
        let valor = taskObj.val();
        let fila = new Done(valor);
        doneContainer.appendChild(fila.render());
    }
    );
})

