class Task {

    constructor(task) {
        this.task = task;

    }

    render = () => {
        let component = document.createElement('div');
        component.innerHTML = `
        <div class="tasks__task tasks__task--toDo"  >
            <p class="tasks__date">
                ${this.task.day} / ${this.task.month} /  ${this.task.year}
            </p>

            <div class="tasks__delete" id="${this.task.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
                </svg>
            </div>

            <p class="tasks__text">
                ${this.task.description}
            </p>

            <div class="tasks__next" id="nextTask">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" />
                </svg>
            </div>
        </div>
        `;

        let taskObj = {
            id: this.task.id,
            description: this.task.description,
            day: this.task.day,
            month: this.task.month,
            year: this.task.year,
        }

        const deleteBtn = component.querySelector('.tasks__delete');

        deleteBtn.addEventListener('click', function () {
            const database = firebase.database();
            database.ref('Tasks/To Do/' + deleteBtn.id).remove();
            console.log(deleteBtn);

        });

        const nextBtn = component.querySelector('.tasks__next');

        nextBtn.addEventListener('click', function () {
            const database = firebase.database();
            database.ref('Tasks/Doing/' + taskObj.id).set(taskObj);
            database.ref('Tasks/To Do/' + taskObj.id).remove();

        });

        return component;

    }

}