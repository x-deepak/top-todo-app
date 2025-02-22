

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

export class NoteData extends Data{
    constructor(content,type){
        super(content,type);
    }
}


export class CheckListData extends Data{
    constructor(content,type,isChecked){
        super(content,type);
        this.isChecked = isChecked;
    }
}


export class Todo{
    constructor(title,desc,dueDate,priority,dataArray){
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.data = dataArray;
    }
}