import React, {useState} from 'react'
import { profanity } from "https://cdn.skypack.dev/@2toad/profanity";

export const TodoForm= ({addTodo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        addTodo(value)

        setValue("")
    }
    return (
        <form className = 'TodoForm' onSubmit = {handleSubmit}> 
            <input type = "text" className = 'todo-input'  placeholder = 'What will you do today?' onChange =
            {(e) => { !profanity.exists(e.target.value) ? setValue(e.target.value) : setValue("Be Better.")}}></input>
            <button type = 'submit' className = 'todo-btn'>Commit</button>
        </form>
    )
}

export default TodoForm