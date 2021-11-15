const grocery = document.getElementById('grocery');
const groceryForm = document.querySelector('.grocery-form');
const groceryContainer = document.querySelector('.grocery-container');
const groceryList = document.querySelector('.grocery-list');
const alert = document.querySelector('.alert');
const submitButton = document.querySelector('.submit-button');
const clearButton = document.querySelector('.clear-button');
let editElement;
let editFlag = false;
let editID = "";
groceryForm.addEventListener('submit',addItem);
clearButton.addEventListener('click',clearItems);
window.addEventListener('DOMContentLoaded',setupItems);
function addItem(event){
     event.preventDefault();
     const value = grocery.value;
     const id = new Date().getTime().toString();
     if(value !== "" && !editFlag){
          const article = document.createElement('article');
          let attribute = document.createAttribute('data-id');
          attribute.value = id;
          article.setAttributeNode(attribute);
          article.classList.add('grocery-item');
          article.innerHTML = `
               <p class="title">${value}</p>
               <div class="button-container">
                    <button type="button" class="edit-button"><i class="fas fa-edit"></i></button>
                    <button type="button" class="delete-button"><i class="fas fa-trash"></i></button>
               </div>
          `;
          const deleteButton = article.querySelector('.delete-button');
          deleteButton.addEventListener('click',deleteItem);
          const editButton = article.querySelector('.edit-button');
          editButton.addEventListener('click',editItem);
          groceryList.appendChild(article);
          displayAlert('Item Added to the List','success');
          groceryContainer.classList.add('show-container');
          addToLocalStorage(id,value);
          setBackToDefault();
     }else if(value !== "" && editFlag){
          editElement.innerHTML = value;
          displayAlert('Value Changed','success');
          editLocalStorage(editID,value);
          setBackToDefault();
     }else{
          displayAlert('Please Enter Value','danger');
     }
}
function displayAlert(text,action){
     alert.textContent = text;
     alert.classList.add(`alert-${action}`);
     setTimeout(function(){
          alert.textContent = "";
          alert.classList.remove(`alert-${action}`);
     },2000);
}
function clearItems(){
     const groceryItem = document.querySelectorAll('.grocery-item');
     if(groceryItem.length > 0){
          groceryItem.forEach(function(item){
               groceryList.removeChild(item);
          });
     }
     groceryContainer.classList.remove('show-container');
     displayAlert('Empty List','Danger');
     setBackToDefault();
     localStorage.removeItem('list');
}
function deleteItem(event){
     const element = event.currentTarget.parentElement.parentElement;
     const id = element.dataset.id;
     groceryList.removeChild(element);
     if(groceryList.children.length === 0){
          groceryContainer.classList.remove('show-container');
     }
     displayAlert('Item Removed','Danger');
     setBackToDefault();
     removeFromLocalStorage(id);
}
function editItem(event){
     const element = event.currentTarget.parentElement.parentElement;
     editElement = event.currentTarget.parentElement.previousElementSibling;
     grocery.value = editElement.innerHTML;
     editFlag = true;
     editID = element.dataset.id;
     submitButton.textContent = 'Edit';
}
function setBackToDefault(){
     grocery.value = "";
     editFlag = false;
     editID = "";
     submitButton.textContent = 'Submit';
}
function addToLocalStorage(id,value){
     const grocery = {id,value};
     let items = getLocalStorage();
     items.push(grocery);
     localStorage.setItem('list',JSON.stringify(items));
}
function getLocalStorage(){
     return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
}
function removeFromLocalStorage(id){
     let items = getLocalStorage();
     items = items.filter(function(item){
          if(item.id !== id) return item;
     });
     localStorage.setItem('list',JSON.stringify(items));
}
function editLocalStorage(id,value){
     let items = getLocalStorage();
     items.map(function(item){
          if(item.id === id){
               item.value = value;
          }
          return item;
     });
     localStorage.setItem('list',JSON.stringify(items));
}
function setupItems(){
     let items = getLocalStorage();
     if(items.length > 0){
          items.forEach(function(item){
               createListItem(item.id,item.value);
          });
          groceryContainer.classList.add('show-container');
     }
}
function createListItem(id,value){
     const article = document.createElement('article');
     let attribute = document.createAttribute('data-id');
     attribute.value = id;
     article.setAttributeNode(attribute);
     article.classList.add('grocery-item');
     article.innerHTML = `
          <p class="title">${value}</p>
          <div class="button-container">
               <button type="button" class="edit-button"><i class="fas fa-edit"></i></button>
               <button type="button" class="delete-button"><i class="fas fa-trash"></i></button>
          </div>
     `;
     const deleteButton = article.querySelector('.delete-button');
     deleteButton.addEventListener('click',deleteItem);
     const editButton = article.querySelector('.edit-button');
     editButton.addEventListener('click',editItem);
     groceryList.appendChild(article);
}