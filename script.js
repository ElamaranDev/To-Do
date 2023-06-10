const form = document.querySelector('.new-task');
const del = document.querySelector('.delete-btn');
const taskName = document.querySelector('.task-name');
const dueDate = document.querySelector('.task-date');

const date = new Date();
var day = String(date.getDate()).padStart(2, '0');
var month = String(date.getMonth() + 1).padStart(2, '0');
var year = date.getFullYear();
var currentDate = `${day}-${month}-${year}`;


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
        var { taskdate } = toDo;
        const html = `
        <div class="task" data-index="${i}">
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
                <button 
                class="edit-btn" 
                id="edit">
                        Edit
                </button>
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
    }
        tasks.innerHTML = toDoList;
        if (task.length === 0) {
            tasks.innerHTML = '';
        }

        const editButtons = document.querySelectorAll('.edit-btn');
        editButtons.forEach((editButton, i) => {
            editButton.addEventListener('mouseup', () => {
                editTask(i);
            });
        });
}

function addtoList(){
    const inputText = document.querySelector('.task-input');
    const inputDate = document.querySelector('.date-input').value;
    
    let inDate = currentDate;

    if (inputDate !== '') {
        var newInputDate = new Date(inputDate);
        var inDay = String(newInputDate.getDate()).padStart(2, '0');
        var inMonth = String(newInputDate.getMonth() + 1).padStart(2, '0');
        var inYear = newInputDate.getFullYear();
        inDate = `${inDay}-${inMonth}-${inYear}`;
    }

    const inputTask = { taskname:inputText.value, taskdate:inDate };

    task.push(inputTask);
    console.log(task);
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

function editTask(i) {
    const edit = document.querySelector(`[data-index="${i}"] .edit-btn`);
    const taskInput = document.querySelector(`[data-index="${i}"] .task-name`);
    var preValue = taskInput.placeholder;
    var previousValue = '';
    if(edit.innerHTML === 'Edit'){
        edit.innerHTML = 'Save';
        taskInput.removeAttribute('readonly');
        console.log(preValue);
        taskInput.value = preValue;
    }
    else{
        edit.innerHTML = 'Edit';
        taskInput.setAttribute('readonly', 'readonly');
        if(taskInput.value !== previousValue) 
        {
            task[i].taskname = taskInput.value;
            taskInput.setAttribute('placeholder', taskInput.value);
            saveTaskList();
        }
    }
}
