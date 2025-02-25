
import { Todo, NoteData, CheckListData} from "./todo.js";
import {projectList} from "./index.js";
import { format } from "date-fns";

const PriorityToText = Object.freeze({
    0: "Normal",
    1: "High",
    2: "Very-High",
});

// makeid code from stackoverflow for label,input ids
function makeid(length) {         
    let result = 'r';    // default prefix, so the id does not start with a number
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 1;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const createNoteDiv = function(note){
    let divNote = document.createElement("div");
    divNote.classList.add("note");
    divNote.innerText = note.content;
    return divNote;
}


const createCheckBoxDiv = function(checkList){
    let checkboxContainer = document.createElement("div");
    checkboxContainer.classList.add("checkbox-container");

    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = checkList.isChecked;

    let inputLabel = document.createElement("label");
    inputLabel.innerHTML = checkList.content;

    let random_id = makeid(5);
    inputCheckbox.id = random_id;
    inputLabel.setAttribute("for", random_id);

    checkboxContainer.append(inputCheckbox,inputLabel);
    return checkboxContainer;

}





const createDataDiv = function(objDataArray){
    let divData = document.createElement("div");
    divData.classList.add("data");
    objDataArray.forEach( (element) => {
        switch(element.type){
            case "note": divData.appendChild(createNoteDiv(element));
                         break;
            case "checkbox": divData.appendChild(createCheckBoxDiv(element));
                             break;
        }
    });
    return divData;
}



const todoObjectToCard = function(todoObject,todoIndex,projectIndex){
    let todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoCard.setAttribute("data-todo-id",todoIndex.toString());
    todoCard.setAttribute("data-project-id",projectIndex.toString());

    let h3Title = document.createElement("h3");
    h3Title.classList.add("title");
    h3Title.innerText = todoObject.title;

    let divDesc = document.createElement("div");
    divDesc.classList.add("desc");
    divDesc.innerText = todoObject.desc;

    // Data
    let divData = createDataDiv(todoObject.data);

    // Top Tiles
    let divTiles = document.createElement("div");
    divTiles.classList.add("top-tiles");

    let divTime = document.createElement("div");
    divTime.classList.add("due-time");
    divTime.innerHTML = todoObject.dueDate;
    divTiles.appendChild(divTime);

    if (todoObject.priority>0){
        let divPriority = document.createElement("div");
        divPriority.classList.add("priority");
        divPriority.innerText = PriorityToText[todoObject.priority] + " Priority";
        if (todoObject.priority>1) divPriority.classList.add("very-high");
        divTiles.appendChild(divPriority);
    }

    //Edit Btn , Del Btn
    let btn_container = createEditDelButtons();


    // finally add all components to Todo card
    todoCard.append(h3Title,divDesc,divData,divTiles,btn_container);
    return todoCard;

}



export const displayTodos = function(todoList,projectIndex){
    // add prj. id to the todo container, useful for adding,del todos in prj
    let todoMainContainer = document.querySelector(".todo-container");
    todoMainContainer.setAttribute("data-project-id",projectIndex);

    let  allTodos = document.querySelector(".all-todos");
    allTodos.innerHTML = "";


    todoList.forEach((element,index) => {
        allTodos.append(todoObjectToCard(element,index,projectIndex));
    });

}


const createEditDelButtons = function(){
    let btn_container = document.createElement("div");
    btn_container.classList.add("edit-del-btn-container");
    //Edit Btn
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = "E"
    
    //Del Btn
    let delBtn = document.createElement("button");
    delBtn.classList.add("del-btn");
    delBtn.innerHTML = "X"

    btn_container.append(editBtn,delBtn);
    return btn_container;
}



const createProjectDiv = function(projectName,index){
    let divProject = document.createElement("div");
    divProject.classList.add("prj");
    divProject.setAttribute("data-project-id",index.toString());

    let paraText = document.createElement("p");
    paraText.innerText = projectName;

    let btn_container = createEditDelButtons();

    divProject.append(paraText,btn_container);
    return divProject;
}



export const displayProjects = function(projectList){
    let prjContainer = document.querySelector(".prj-list");

    projectList.forEach( (element,index) => {
        prjContainer.appendChild(createProjectDiv(element.name,index));
    });
}



let dialog = document.querySelector("dialog");

let todoAddButton = document.querySelector("#add-todo");

todoAddButton.addEventListener("click", event => {
    dialog.showModal();
});


let cancelButton = document.querySelector("#cancel-btn");

cancelButton.addEventListener("click", event => {
    dialog.close();
});


function readDataNote(dataArray, element){
    let content = '';
    for (const child of element.children) {
        if (child.tagName ==="INPUT")
            content = child.value;
    }
    let note = new NoteData(content, "note");
    dataArray.push(note);
}

function readDataCheckbox(dataArray, element){
    let content = '';
    let isChecked=false;
    for (const child of element.children) {
        if (child.type ==="text")
            content = child.value;
        else if(child.type ==="checkbox")
            isChecked = child.checked;
    }
    let checkbox = new CheckListData(content, "checkbox",isChecked);
    dataArray.push(checkbox);
}




function readData(){
    let dataArray = [];
    let dialogDataContainer = document.querySelector('.dialog-data-container');
    for (const child of dialogDataContainer.children) {
        if (child.className === "note-div") readDataNote(dataArray,child);
        else if (child.className === "checkbox-div") readDataCheckbox(dataArray,child);
    }

    return dataArray;
}



const dialogForm = document.querySelector('#dialog-form'); 


dialogForm.addEventListener("submit", event => {
    event.preventDefault();
    // get project id
    let todoMainContainer = document.querySelector(".todo-container");

    const projectId = todoMainContainer.getAttribute("data-project-id");
    
    /// change this

    const formData = new FormData(dialogForm); 

    const title = formData.get('title'); 
    const date = formData.get('date'); 
    const descp = formData.get('descp'); 
    const priority = formData.get('priority');
    // Do data validation here -->
    
    console.log(title,date,descp,priority);

    let formattedDate = new Date(date);

    let dataArray = readData();

    let newTodo = new Todo(title,descp,formattedDate,priority,dataArray);

    projectList[projectId].todos.push(newTodo);

    displayTodos(projectList[projectId].todos, projectId);
    
    dialog.close();

});




function createAndAddNote(dataContainer,note){
    let divNote = document.createElement("div");
    divNote.classList.add("note-div");
    let input = document.createElement("input");
    input.value = note.content;
    let btn  = document.createElement("button");
    btn.innerText = "X"
    divNote.append(input,btn);
    dataContainer.appendChild(divNote);
}


function createAndAddCheck(dataContainer,checkbox){
    let divCheck = document.createElement("div");
    divCheck.classList.add("checkbox-div");
    let checkboxInput = document.createElement("input");
    checkboxInput.type = "checkbox";
    checkboxInput.checked = checkbox.isChecked;
    let textInput = document.createElement("input");
    textInput.value = checkbox.content;

    let btn  = document.createElement("button");
    btn.innerText = "X"

    divCheck.append(checkboxInput,textInput,btn);
    dataContainer.appendChild(divCheck);
}




function populateDialog(todo){

    const title = document.querySelector("#title");
    title.value = todo.title;

    const date = document.querySelector("#date")
    const formattedDate = format( todo.dueDate,"yyyy-MM-dd");
    console.log(formattedDate);
    date.value = formattedDate;

    const priority_id = "#priority-" + PriorityToText[todo.priority];
    const priority_radio = document.querySelector(priority_id);
    priority_radio.checked = true;

    const dataContainer = document.querySelector(".dialog-data-container");

    todo.data.forEach( item => {
        if (item.type=="note") createAndAddNote(dataContainer,item);
        else if(item.type=="checkbox") createAndAddCheck(dataContainer,item);
    });








}




let allTodos = document.querySelector('.all-todos');

allTodos.addEventListener("click", event =>{
    if (event.target.className === "edit-btn"){

        // lmao this train code (if it works -> don't touch it!)
        const todoCard = event.target.parentNode.parentNode;
        const projectId =  todoCard.dataset.projectId;
        const todoId  = todoCard.dataset.todoId;

        console.log(projectId)
        console.log(todoId)

        dialog.showModal();  //try putting it after popu
        populateDialog(projectList[projectId].todos[todoId]);
        
    }
});