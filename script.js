const form = document.querySelector('.new-task');
const inputText = document.querySelector('.task-input');
const inputDate = document.querySelector('.date-input');
const tasks = document.querySelector('.tasks');
const taskName = document.querySelector('.task-name');
const dueDate = document.querySelector('.task-date');

const task = [];
let toDoList = '';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addtoList();
    form.reset();
});

function addtoList(){
    task.push({ taskname:inputText.value, taskdate:inputDate.value });
    for(let i=0; i < task.length; i++){
        const toDo = task[i];
        const { taskname } = toDo;
        const { taskdate } = toDo;
        const html = `
        <div class="task">
            <input
                class="task-name"
                type="text"
                value=""
                placeholder="${ taskname }"
                readonly>
            <span class="task-date" id="task-date">
                ${ taskdate }
            </span>
            <div class="actions">
                <button class="edit-btn" id="edit">Edit</button>
                <button class="delete-btn" id="delete">Delete</button>
            </div> 
        </div>`;
        tasks.innerHTML = html;
        toDoList += html;
    }
console.log(task); 
}
