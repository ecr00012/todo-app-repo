import React, {useState} from 'react'
import { profanity } from '@2toad/profanity'


export const TodoForm= ({addTodo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
       
        if (value){
            addTodo(value)
            
            setValue(""); 
            document.getElementById('todo-input').value = ""
           
            }
    
    }
    
    
    return (
        <form className = 'TodoForm' onSubmit = {handleSubmit}> 
            <input type = "text" id = 'todo-input' className = 'todo-input'  placeholder = 'what will you do today?' onChange =
            {(e) => { !profanity.exists(e.target.value) ? setValue(e.target.value) : setValue("Be Better.")}}></input>
            <button type = 'submit' className = 'todo-btn'>commit.</button>
            
        </form>
    )
}

export default TodoForm