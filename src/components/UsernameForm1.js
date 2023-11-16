import React, {useState, useEffect} from 'react'
import { profanity } from '@2toad/profanity'
import {supabase} from '../App'
import { useNavigate } from 'react-router-dom'

export const UsernameForm = (
) => {
    
    const [username, setUsername] = useState("")
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
          if (!data.user) {
           navigate("/login")
            return;
          }
          setUser(data.user)
        })
          supabase
          .from('usernames')
          .select().then(({data}) =>{
            console.log(data)
            if (data.length !== 0)
            {
              console.log(data)
              navigate("/")
              return
            }
          })
          
         
          

        
    }, [])
 
    const handleSubmit = async (e) => {

        e.preventDefault()

        
        const { data, error } = await supabase
        .from("usernames")
        .insert([
          { id : user?.id , username: username },
        ])
  
        document.getElementById("username").value = ""
        navigate("/")
        

    }

    return (
      <div className = "UsernameForm">
        <form className = "TodoForm " onSubmit = {handleSubmit}> 
        <input type = "text" className = 'todo-input' id = "username" placeholder = 'luke imbing' onChange =
        {(e) => { !profanity.exists(e.target.value) ? setUsername(e.target.value) : document.getElementById("username").innerHTML = "" }}></input>
        <button type = 'submit' className = 'todo-btn'>ENTER THE VOID</button>
        
    </form>
    </div >

    )
}