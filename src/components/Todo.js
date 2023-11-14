import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import { Draggable } from 'react-beautiful-dnd'
import { CSSTransition } from 'react-transition-group'
export const Todo = ({task, toggleComplete, deleteTodo, editTodo, index}) =>{

    return (
        <Draggable draggableId = {task.id.toString()} index = {index}>
            {(provided) => ( 
                
        <div className = 'Todo'
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref = {provided.innerRef}
        >
            <p onClick = {() => toggleComplete(task.id)} className = {`${task.completed ? 'completed' : ""}`}>{task.task}</p>
            <div>

                <FontAwesomeIcon icon = {faMinusCircle} onClick = {
                    () => deleteTodo(task.id)} />
            </div>
        </div>
        
            )}
        </Draggable>
    )
}

export default Todo