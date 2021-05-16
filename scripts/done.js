class Done {

    constructor(task) {
        this.task = task;

    }

    render = () => {
        let component = document.createElement('div');
        component.innerHTML = `
        <div class="tasks__task tasks__task--done">

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

            <div class="tasks__previous" id="previousTask">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        d="M0 12c0 6.627 5.373 12 12 12s12-5.373 12-12-5.373-12-12-12-12 5.373-12 12zm7.58 0l5.988-5.995 1.414 1.416-4.574 4.579 4.574 4.59-1.414 1.416-5.988-6.006z" />
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
            database.ref('Tasks/Done/' + deleteBtn.id).remove();
            console.log(deleteBtn);

        });

        const previousBtn = component.querySelector('.tasks__previous');

        previousBtn.addEventListener('click', function () {
            const database = firebase.database();
            database.ref('Tasks/Doing/' + taskObj.id).set(taskObj);
            database.ref('Tasks/Done/' + taskObj.id).remove();

        });

        return component;

    }

}