import React, {useEffect, useState, useRef} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'
import {v4 as uuidv4} from 'uuid'
import { Droppable, DragDropContext} from 'react-beautiful-dnd'
import { supabase } from '../App'
import { CSSTransition, TransitionGroup,  } from 'react-transition-group'
import '../App.css' 

uuidv4()



export const TodoWrapper = () =>
{

    
    const [todos, setTodos] = useState([])
    const [username, setUsername] = useState("")
    
    
    let nameHeader = ""
    useEffect(() =>{

       
        if (localStorage.getItem("todos")){
            setTodos((JSON.parse(localStorage.getItem("todos"))))
            
           
 }
 }, [])


    



    const addTodo = todo => {
        const newTodos = [...todos, {id: uuidv4(), task: todo, completed:false, isEditing: false}]
        setTodos(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))


    }

    const deleteTodo = id =>{
        
            const newTodos = todos.filter(todo=>todo.id !== id)
        setTodos(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))
        
        

    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, isEditing: !todo.isEditing} : todo))
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed : !todo.completed} : todo)
        setTodos(newTodos)
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }

    const editTask = (task,id) => {
        const newTodos = todos.map(todo => todo.id === id ? {
            ...todo, task, isEditing : !todo.isEditing} : todo)
            setTodos(newTodos)
            localStorage.setItem("todos", JSON.stringify(newTodos))
    }

    const handleClick = () => {
        setTodos([])
        localStorage.setItem("todos","")
    }

    const onDragEnd = (result) => {

        const {source, destination} = result;
    
        if (!destination)
        return
    
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        )
        return
            
        let add, todoList = todos
    
        if (source.droppableId === "TodoDrops"){
            add = todoList[source.index]
            todoList.splice(source.index, 1)
        }

        if (destination.droppableId === "TodoDrops"){
           todoList.splice(destination.index,0,add)
        }

console.log(JSON.stringify(todos))
console.log(JSON.stringify(todoList))
       setTodos(todoList)
       localStorage.setItem("todos", JSON.stringify(todoList))

      }

      

    return (
        
        <DragDropContext onDragEnd = {onDragEnd}>
           
            <button style = {{"top": "10px", "right": "10px", "position" : "absolute"}} className = 'todo-btn' onCLick ={supabase.auth.signOut()}>logout</button>
            <h1 className = 'title'> {nameHeader} Your Future Awaits</h1>  
            <div className = "TodoWrapper">
                    <Droppable droppableId='TodoDrops'>
                    {(provided, snapshot) => (
                    <div 

                    ref = {provided.innerRef}
                    {...provided.droppableProps}>
                     <TodoForm addTodo = {addTodo} />
            
                    <div className = { `${snapshot.isDraggingOver ? "dragActive" : "" }`}>
            
                        <TransitionGroup className= "todosList">
                        {todos.map((todo, index) => (
                        
                                    
                            
                                 
                               //
                                    
                                    <CSSTransition  in= {true} appear = {true} key={todo.id.toString()} timeout={200} classNames={"todoTransition"}>
                                       
                                        <Todo  task = {todo} key = {todo.id.toString()} index = {index}
                                        toggleComplete = {toggleComplete} deleteTodo = {deleteTodo}
                                        editTodo = {editTodo} classNames = "Todo"></Todo>
                                       
                                   </CSSTransition>
                                  
                                    
                                     

                           
                                   
                                         
                           ))}
                           </TransitionGroup>

             
                    
                    
                    {provided.placeholder}
                
                    
                
                    </div>
              </div>
               )}
              </Droppable>
              
              { todos.length > 0 && <button className = "todo-btn fadeUp"  onClick = {handleClick}>Clear</ button> }
             
        </div>
        </DragDropContext>
    )
}