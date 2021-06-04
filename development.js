const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllButton = document.querySelector(".footer button");
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value;
  if(userEnteredValue.trim() != 0){
    addButton.classList.add("active");
  }else{
    addButton.classList.remove("active");
  }
}
showTasks();
addButton.onclick = ()=>{
  let userEnteredValue = inputBox.value;
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userEnteredValue);
  localStorage.setItem("New Todo",JSON.stringify(listArray));
  showTasks();
  addButton.classList.remove("active");
}
function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length;
  if(listArray.length > 0){
    deleteAllButton.classList.add("active");
  }else{
    deleteAllButton.classList.remove("active");
  }
  let newLiTag = "";
  listArray.forEach((element,index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
}
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index,1);
  localStorage.setItem("New Todo",JSON.stringify(listArray));
  showTasks();
}
deleteAllButton.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData);
    listArray = [];
  }
  localStorage.setItem("New Todo",JSON.stringify(listArray));
  showTasks();
}
