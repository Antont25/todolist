import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistAT = {
    type: 'REMOVE_TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD_TODOLIST'
    id: string
    title: string
}
export type ChangeFilterTodolistAT = {
    type: 'CHANG_FILTER_TODOLIST'
    value: FilterValuesType
    todolistId: string
}
export type ChangeTitleTodolistAT = {
    type: 'CHANG_TITLE_TODOLIST'
    title: string
    todolistId: string
}
type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeFilterTodolistAT | ChangeTitleTodolistAT

export let todolistId1 = v1();
export let todolistId2 = v1();

let initialState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]


export const todolistReducer = (state = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(item => item.id !== action.id)
        case "ADD_TODOLIST":
            let newTodolist: TodolistType = {
                id: action.id,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist]
        case "CHANG_FILTER_TODOLIST":
            return state.map(item => item.id === action.todolistId
                ? {...item, filter: action.value}
                : item)
        case "CHANG_TITLE_TODOLIST":
            return state.map(item => item.id === action.todolistId ? {...item, title: action.title} : item)
        default :
            return state
    }
};

export const removeTodolistAC = (id: string): RemoveTodolistAT => ({type: 'REMOVE_TODOLIST', id})
export const addTodolistAC = (title: string): AddTodolistAT => ({type: 'ADD_TODOLIST', title, id: v1()})
export const changeFilterTodolistAC = (value: FilterValuesType, todolistId: string): ChangeFilterTodolistAT => ({
    type: 'CHANG_FILTER_TODOLIST',
    value,
    todolistId
})
export const changeTitleTodolistAC = (title: string, todolistId: string): ChangeTitleTodolistAT => ({
    type: 'CHANG_TITLE_TODOLIST',
    title,
    todolistId
})

