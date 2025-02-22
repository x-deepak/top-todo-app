

const Priority = Object.freeze({
    NORMAL: 0,
    HIGH: 1,
    VERY_HIGH: 2,
});



class Data{
    constructor(content,type){
        this.content = content;
        this.type = type;
    }
}




class Todo{
    constructor(title,desc,dueDate,priority,dataArray){
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.data = dataArray;
    }
}