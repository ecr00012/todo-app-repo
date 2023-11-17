import React, {useEffect, useState, useRef} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo'
import EditTodoForm from './EditTodoForm'
import {v4 as uuidv4} from 'uuid'
import { Droppable, DragDropContext} from 'react-beautiful-dnd'
import { supabase } from '../App'
import { CSSTransition, TransitionGroup,  } from 'react-transition-group'
import { useNavigate } from 'react-router-dom'
import '../App.css' 
uuidv4()



export const TodoWrapper = ({listId}) => 
{

    
    const [todos, setTodos] = useState([])
    const [username, setUsername] = useState("")
    const [user, setUser] = useState();
    const navigate = useNavigate()
    
    let nameHeader = ""
    useEffect(() =>{

        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
              navigate("/login")
              return
            }
            
            setUser(data.user)})
                
                 supabase
                .from("usernames")
                .select().then(({data}) =>{
                    console.log(data)
                    if (data.length === 0)
                    {
                        navigate("/setUsername")
                        return
                    }
                    else 
                    {
                       setUsername(data[0].username)
                    }
                })

        
                
            
        
       
       //if (localStorage.getItem("todos")){
        //   setTodos((JSON.parse(localStorage.getItem("todos"))))
       // }
       updateTodos()
        
           
        
 }, [])


    const  updateTodos = async (user) => {

        const todos = await supabase
        .from("todos")
        .select()
        .then(({data}) =>{
            
            if (data)
            {
                setTodos(data)
            }
            
        })

      
    }



    const addTodo = async todo => {
        const id = uuidv4()
       // const newTodos = [...todos, {id: id, task: todo, completed:false, isEditing: false}]
       // setTodos(newTodos)
       // localStorage.setItem("todos", JSON.stringify(newTodos))

        const tod = await supabase
        .from('todos')
        .insert({  "id": id, "task" : todo, "isEditing": false, "completed":false, "userid": user.id, "username" : username})

        updateTodos()
        
        

    }

    const deleteTodo = async id =>{
        
        //const newTodos = todos.filter(todo=>todo.id !== id)
       // setTodos(newTodos)
        //localStorage.setItem("todos", JSON.stringify(newTodos))
        
        await supabase
        .from('todos')
        .delete()
        .eq("id", id)

        updateTodos()

    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, isEditing: !todo.isEditing} : todo))
    }

    const toggleComplete = async id => {
       // const newTodos = todos.map(todo => todo.id === id ? {...todo, completed : !todo.completed} : todo)
        //setTodos(newTodos)
       // localStorage.setItem("todos", JSON.stringify(newTodos))

       
       const todo = await supabase 
        .from('todos')
        .select()
        .eq("id",id).then(  async (todo) =>{

        const completed = todo.data[0].completed

        await supabase
        .from('todos')
        .update({completed: !completed})
        .eq("id", id)
    })

    updateTodos()

    }

    const editTask = (task,id) => {
        const newTodos = todos.map(todo => todo.id === id ? {
            ...todo, task, isEditing : !todo.isEditing} : todo)
            setTodos(newTodos)
            localStorage.setItem("todos", JSON.stringify(newTodos))
    }

    const handleClick =async () => {
        

        await supabase
        .from('todos')
        .delete()
        .eq("userid", user.id)
        

        updateTodos()

    }

    const logout = () => {
        supabase.auth.signOut()
        navigate("/login")
    }

    const onDragEnd = async (result) => {

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



       
       await supabase
       .from('todos')
       .delete()
       .eq("userid", user.id)

        {todoList.map( async (todo)=>{
            console.log(todo)
            await supabase
            .from('todos')
            .insert({"id": todo.id, "task" :todo.task, "completed" : todo.completed, "isEditing" : todo.isEditing, "userid" : user.id, "username" : username})
            
        })} 
     // setTodos(todoList)
    //  localStorage.setItem("todos", JSON.stringify(todoList))

      }

      

    return (
        
        <DragDropContext onDragEnd = {onDragEnd}>
           
            <button style = {{"top": "10px", "right": "10px", "position" : "absolute"}} className = 'todo-btn logoutButton' onClick = {logout}>logout</button>
           
            <h1 className = "title titleFadeUp"> {username + ",  your future awaits"}</h1>  
            <div className = "TodoWrapper">
                    <Droppable droppableId='TodoDrops'>
                    {(provided, snapshot) => (
                    <div 

                    ref = {provided.innerRef}
                    {...provided.droppableProps}>
                     <TodoForm addTodo = {addTodo} />
            
                    <div className = { `${snapshot.isDraggingOver ? "dragActive" : "dragOver" }`}>
            
                        <TransitionGroup className= "todosList">
                        {todos.map((todo, index) => (
                        
                                    
                            
                                 
                               //
                                    
                                    <CSSTransition  in= {true} appear = {true} key={todo.id.toString()} timeout = {400} classNames={"todoTransition"}>
                                       
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
              
              { todos.length > 0 && <button className = "todo-btn fadeUp" onClick = {handleClick}>clear</button> }
             
        </div>
        </DragDropContext>
    )
}