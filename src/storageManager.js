
const getTodos = function(todoList){

}

const getProjects = function(projects){ 
    let projectList = [];
    projects.forEach(element => {
        let todoList = localStorage.getItem(element);
        if (todoList !== nul){
           let todos = getTodos(todoList);
           if (todos)
        }
    });

}



export const getProjectList = function(){
    let projectList = [];
    let projects = localStorage.getItem("projects");
    if (projects !== null){
        projects = JSON.parse(projects);
        projectList = getProjects(projects);
    }
    return projectList;
}