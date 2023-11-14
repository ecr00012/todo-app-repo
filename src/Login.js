import React, {useEffect} from 'react';
import {supabase} from './App'
import { useNavigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import {ThemeSupa} from '@supabase/auth-ui-shared'

export const  Login= 
() =>  {


  

    return (
    <div class = "loginForm">
        <h1  id = "loginTitle" className = "title">What Will You Do? </h1>
            <div className = "Auth">
                    <Auth 
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={['google', 'facebook', 'twitter']}
                    theme="dark"
                    />
            </div>
  </div>
  );
}



