import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import App, {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemsForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, FormControlLabel, IconButton, List, ListItem} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {HighlightOff} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    setNewTitleTask: (todolistId: string, taskId: string, newTitle: string) => void
    setNewTitleTodolist: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    function setNewTitle(newTitle: string) {
        props.setNewTitleTodolist(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} setNewTitle={setNewTitle}/>
            <IconButton onClick={removeTodolist}
                        size={"small"}
                        color={"secondary"}
            >
                <HighlightOff/>
            </IconButton>
        </h3>
        <div>
            <AddItemForm addItem={addTask}/>
        </div>
        <List component="nav" >
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    function setNewTitle(newTitle: string) {
                        props.setNewTitleTask(props.id, t.id, newTitle)
                    }

                    return <ListItem key={t.id}
                                     className={t.isDone ? "is-done" : ""}
                                     style={{padding:'0px'}}
                    >
                        <Checkbox
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onChange={onChangeHandler}
                            checked={t.isDone}
                            size={'small'}
                        />
                        <EditableSpan title={t.title}
                                      setNewTitle={setNewTitle}
                        />
                        <IconButton aria-label="delete"
                                    onClick={onClickHandler}
                                    size={"small"}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <Button variant={"contained"}
                    size={"small"}
                    color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={onAllClickHandler}
                    disableElevation
            >
                All
            </Button>
            <Button variant={"contained"}
                    size={"small"}
                    color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}
                    disableElevation
            >
                Active
            </Button>
            <Button variant={"contained"}
                    size={"small"}
                    color={props.filter === 'completed' ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}
                    disableElevation
            >
                Completed
            </Button>
        </div>
    </div>
}


