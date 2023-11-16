import React, {useEffect, useState} from 'react';
import {supabase} from './App'
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared'


export const Login = () =>
 {
const navigate = useNavigate()
const [session, setSession] = useState()
const [user, setUser] = useState()
    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      

      supabase.auth.onAuthStateChange((_event, session) => {
        if (session)
        {

          supabase.auth.getUser().then(({data}) =>{
            setUser(data.user)
          })

            supabase
            .from('usernames')
            .select().then(({data})=> {
              console.log(data)
              if (data.length === 0)
                 navigate("/setUsername")
              else
                navigate("/")
            })
            
             
       
        
       
        
    }})

      
         
        
    }, [])

    


    return (
    <div className = "loginForm titleFadeUp">
        <h1  id = "loginTitle" className = "title">What Will You Do? </h1>
            <div className = "Auth">
                    <Auth 
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={['google', 'facebook', 'twitter']}
                    theme="dark"
                    redirectTo='localhost:3000/'
                    />
            </div>
  </div>
  );

}




