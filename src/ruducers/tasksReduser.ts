import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, todolistId1, todolistId2} from "./todolistReduser";


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACActionType = ReturnType<typeof changeTaskTitleAC>


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusACActionType
    | ChangeTaskTitleACActionType
    | AddTodolistAT
    | RemoveTodolistAT


let initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}
export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASKS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'ADD_TASKS':
            const nweTasck = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todolistId]: [nweTasck, ...state[action.todolistId]]
            }
        case "CHANGE_TASKS":
            return {
                ...state,
                [action.todolistId]: state [action.todolistId].map(item => item.id === action.taskId ? {
                    ...item,
                    isDone: action.isDone
                } : item)
            }
        case "CHANGE_TASKS_Title":
            return {
                ...state,
                [action.todolistId]: state [action.todolistId].map(item => item.id === action.taskId ? {
                    ...item,
                    title: action.title
                } : item)
            }
        case "ADD_TODOLIST":
            return {
                ...state,
                [action.id]: []
            }
        case "REMOVE_TODOLIST":
            const newState = {...state}
            delete newState[action.id]
            return newState
        default :
            return state
    }
};

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE_TASKS',
    taskId,
    todolistId
} as const)

export const addTaskAC = (title: string, todolistId: string) => ({
    type: 'ADD_TASKS',
    title,
    todolistId
} as const)
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => ({
    type: 'CHANGE_TASKS',
    taskId,
    isDone,
    todolistId
} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({
    type: 'CHANGE_TASKS_Title',
    taskId,
    title,
    todolistId
} as const)
