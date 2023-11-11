import React, {useState} from 'react'


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
            {(e) => setValue(e.target.value)}></input>
            <button type = 'submit' className = 'todo-btn'>Commit</button>
        </form>
    )
}

export default TodoForm