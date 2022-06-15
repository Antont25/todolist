import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemsForm";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Container, Grid, Paper} from "@material-ui/core";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(item => item.id !== id)})
    }

    function addTask(title: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], {id: v1(), title, isDone: false}]})
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(item => item.id === id ? {...item, isDone} : item)})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(item => item.id === todolistId ? {...item, filter: value} : item))
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(item => item.id !== id))
        delete tasks[id]
    }

    function addTodolist(title: string) {
        let newTodolist: TodolistType = {id: v1(), title, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function setNewTitleTask(todolistId: string, taskId: string, newTitle: string) {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(item => item.id === taskId ? {...item, title: newTitle} : item)
        })


    }

    function setNewTitleTodolist(todolistId: string, newTitle: string) {
        debugger
        setTodolists(todolists.map(item => item.id === todolistId ? {...item, title: newTitle} : item))
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <Grid item spacing={3} style={{padding: '15px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: '15px'}} elevation={3}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        setNewTitleTask={setNewTitleTask}
                                        setNewTitleTodolist={setNewTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default App;
