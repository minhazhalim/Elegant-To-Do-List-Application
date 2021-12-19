const task = document.querySelector('#task');
const taskForm = document.querySelector('#task-form');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const collection = document.querySelector('.collection');
function loadEventListeners(){
     document.addEventListener('DOMContentLoaded',getTask);
     taskForm.addEventListener('submit',addTask);
     collection.addEventListener('click',removeTask);
     clearTasks.addEventListener('click',clearTask);
     filter.addEventListener('keyup',filterTask);
}
loadEventListeners();
function getTask(){
     let tasks;
     if(localStorage.getItem('tasks') === null){
          tasks = [];
     }else{
          tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.forEach(function(task){
          const list = document.createElement('li');
          list.className = 'collection-item';
          list.appendChild(document.createTextNode(task));
          const anchor = document.createElement('a');
          anchor.className = 'delete-item secondary-content';
          anchor.innerHTML = '<i class="fa fa-remove"></i>';
          list.appendChild(anchor);
          collection.appendChild(list);
     });
}
function addTask(event){
     if(task.value === ""){
          alert('Add a Task');
     }
     event.preventDefault();
     const list = document.createElement('li');
     list.className = 'collection-item';
     list.appendChild(document.createTextNode(task.value));
     const anchor = document.createElement('a');
     anchor.className = 'delete-item secondary-content';
     anchor.innerHTML = '<i class="fa fa-remove"></i>';
     list.appendChild(anchor);
     collection.appendChild(list);
     storeTaskInLocalStorage(task.value);
     task.value = "";
}
function storeTaskInLocalStorage(task){
     let tasks;
     if(localStorage.getItem('tasks') === null){
          tasks = [];
     }else{
          tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.push(task);
     localStorage.setItem('tasks',JSON.stringify(tasks));
}
function removeTask(event){
     if(event.target.parentElement.classList.contains('delete-item')){
          if(confirm('Are You Sure ?')){
               event.target.parentElement.parentElement.remove();
               removeTaskFromLocalStorage(event.target.parentElement.parentElement);
          }
     }
}
function removeTaskFromLocalStorage(taskItem){
     let tasks;
     if(localStorage.getItem('tasks') === null){
          tasks = [];
     }else{
          tasks = JSON.parse(localStorage.getItem('tasks'));
     }
     tasks.forEach(function(task,index){
          if(taskItem.textContent === task){
               tasks.splice(index,1);
          }
     });
     localStorage.setItem('tasks',JSON.stringify(tasks));
}
function clearTask(){
     while(collection.firstChild){
          collection.removeChild(collection.firstChild);
     }
     clearTasksFromLocalStorage();
}
function clearTasksFromLocalStorage(){
     localStorage.clear();
}
function filterTask(event){
     const text = event.target.value.toLowerCase();
     document.querySelectorAll('.collection-item').forEach(function(task){
          const item = task.firstChild.textContent;
          if(item.toLowerCase().indexOf(text) != -1){
               task.style.display = 'block';
          }else{
               task.style.display = 'none';
          }
     });
}