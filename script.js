const form = document.querySelector('.new-task');
const reset = document.querySelector('.delete-btn')

const taskName = document.querySelector('.task-name');
const dueDate = document.querySelector('.task-date');


const task = [];

window.addEventListener('load', function(){
    form.reset();
}); 

renderToDo();
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addtoList();
    form.reset();
});

function renderToDo(){
    let toDoList = '';
    const tasks = document.querySelector('.tasks');
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
                <button
                onClick="toDo.splice(${i}, 1);
                renderToDo();" 
                class="delete-btn" 
                id="delete">Delete</button>
            </div> 
        </div>`;
        toDoList += html;
        tasks.innerHTML = toDoList;
    }
}

function addtoList(){
    const inputText = document.querySelector('.task-input');
    const inputDate = document.querySelector('.date-input');
    const inputTask = { taskname:inputText.value, taskdate:inputDate.value };
    task.push(inputTask);
    renderToDo();
}

