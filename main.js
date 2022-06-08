const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const taskWrapper = document.querySelector('.task-wrapper');

let tasks = [];
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));

let taskItemElems = [];

function Task(description){
    this.description = description;
    this.completed = false;
}


const createTemplate = (task, index) =>{
    return `

            <div class="task-item ${task.completed ? 'checked' : ''}" >
                <div class="description">${task.description}</div>
                <div class="buttons">
          
                    <button onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>Complete</button>
                    <button onclick="deleteTask(${index})" class="btn-delete" > Delete</button>
                </div>
            </div>
    
    `
}
const fillHtmlList = () => {
    taskWrapper.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach((item, index) => {
            taskWrapper.innerHTML += createTemplate(item, index);
        })
        taskItemElems = document.querySelectorAll('.task-item');
    }
}

fillHtmlList();

const updateLocal = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
        taskItemElems[index].classList.add('checked');
    } else{
        taskItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}

addTaskBtn.addEventListener('click', () =>{
    tasks.push(new Task(deskTaskInput.value))
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

function Task(description){
    this.description = description;
    this.completed = true;
}

function updateList(){
    let i = 0;
    do {
        tasks[i].completed = true;
    i++;
    } while (i < tasks.length);

    updateLocal();
    fillHtmlList();
}

function clearList() {
	tasks = [];
    updateLocal();
    fillHtmlList();
}