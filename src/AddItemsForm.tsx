import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addTask = () => {
        const taskTitle = title.trim()
        if(taskTitle){
            props.addItem(taskTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>)=> {
        const taskTitle = e.currentTarget.value.trim()
        setTitle(e.currentTarget.value)
        if(error && taskTitle)setError(false)
        if(!error && !taskTitle)setError(true)
    }
    const onKeyDownAddTask  = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addTask()
    const errorInputStyle = error ? {border: "2px solid red", outline: "none"} : undefined
    return (
        <div>
            <input
                style={errorInputStyle}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}

            />
            <button onClick={addTask}>+</button>
            {error && <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>}
        </div>
    );
};

export default AddItemForm;