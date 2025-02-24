
const PriorityToText = Object.freeze({
    0: "Normal",
    1: "High",
    2: "Very High",
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
    console.log(checkboxContainer);
    return checkboxContainer;

}





const createDataDiv = function(objDataArray){
    let divData = document.createElement("div");
    divData.classList.add("data");
    console.log(objDataArray);
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



const todoObjectToCard = function(todoObject,index){
    let todoCard = document.createElement("div");
    todoCard.classList.add("todo-card");
    todoCard.setAttribute("data-todoId",index.toString());

    let h3Title = document.createElement("h3");
    h3Title.classList.add("title");
    h3Title.innerText = todoObject.title;

    let divDesc = document.createElement("div");
    divDesc.classList.add("desc");
    divDesc.innerText = todoObject.desc;

    // Data
    console.log(todoObject.data);
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

    //Edit Btn
    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = "X"

    // finally add all components to Todo card
    todoCard.append(h3Title,divDesc,divData,divTiles,editBtn);
    return todoCard;

}



export const displayTodos = function(todoList,projectIndex){
    let  todoContainer = document.querySelector(".all-todos");
    todoContainer.setAttribute("data-projectId",projectIndex);

    todoList.forEach((element,index) => {
        todoContainer.append(todoObjectToCard(element,index));
    });

}


const createProjectDiv = function(projectName,index){
    let divProject = document.createElement("div");
    divProject.classList.add("prj");
    divProject.setAttribute("data-projectId",index.toString());
    divProject.innerText = projectName;
    return divProject;
}



export const displayProjects = function(projectList){
    let prjContainer = document.querySelector(".prj-list");

    projectList.forEach( (element,index) => {
        prjContainer.appendChild(createProjectDiv(element.name,index));
    });
}









export const showDialog = function(){

}