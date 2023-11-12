import React, {useState} from 'react'
import { profanity } from '@2toad/profanity'

export const EditTodoForm= ({editTodo, task}) => {
    const [value, setValue] = useState(task.task)

    const handleSubmit = e => {
        e.preventDefault()

        
        editTodo(value, task.id)
        
        setValue("")
    }
    return (
        <form className = 'TodoForm' onSubmit = {handleSubmit}> 
            <input type = "text" className = 'todo-input'  placeholder = 'Update Task' onChange =
            {(e) => { {!profanity.exists(e.target.value) ? setValue(e.target.value) : setValue("Be better.")}}}></input>
            <button type = 'submit' className = 'todo-btn'>Update Task</button>
        </form>
    )
}

export default EditTodoForm