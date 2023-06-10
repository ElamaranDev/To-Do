const form = document.querySelector('.new-task');
const del = document.querySelector('.delete-btn');
const taskName = document.querySelector('.task-name');
const dueDate = document.querySelector('.task-date');


let task = [];

window.addEventListener('load', function(){
    form.reset();
    retriveTaskList();
    renderToDo();
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
            <span id="task-num" class="task-num">
            ${i + 1}
            </span>
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
                onclick="
                task.splice(${i}, 1);
                saveTaskList();
                renderToDo();"
                class="delete-btn" 
                id="delete">Delete</button>
            </div> 
        </div>`;
        toDoList += html;
        tasks.innerHTML = toDoList;
    }
    if (task.length === 0) {
        tasks.innerHTML = '';
    }
}
function addtoList(){
    const inputText = document.querySelector('.task-input');
    const inputDate = document.querySelector('.date-input');
    const inputTask = { taskname:inputText.value, taskdate:inputDate.value };
    task.push(inputTask);
    saveTaskList();
    renderToDo();
}
function saveTaskList(){
    localStorage.setItem('Task', JSON.stringify(task));
}

function retriveTaskList(){
    const TaskList = localStorage.getItem('Task');
    if(TaskList){
        task = JSON.parse(TaskList);
    }
    else{
        task = [];
    }
}