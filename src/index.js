
import "./style.css";

// import { getProjectList } from "./storageManager";
import { Project } from "./projects";
import { Todo, NoteData, CheckListData} from "./todo.js";
import { displayTodos,displayProjects } from "./domManipulator";

// load data & display

let projectList = [];





// present state

let default_prj = new Project("default", []);

let sample_todo = new Todo("Title","Descp: Todo I have to do Tmmr","Due Today",2,[]);

let sample_NoteData = new NoteData("Study Related", "note");
let sample_checkData = new CheckListData("DSA Contest Eveniing", "checkbox", true);

sample_todo.data.push(sample_NoteData);
sample_todo.data.push(sample_checkData);

default_prj.todos.push(sample_todo);

projectList.push(default_prj);


displayProjects(projectList);

displayTodos(projectList[0].todos, 0);

// update & save data