
import React, { useEffect,useState } from 'react';
import {TodoWrapper} from './components/TodoWrapper'
import {Login} from './Login';
import { UsernameForm } from './components/UsernameForm1.js';
import './App.css';
import { createClient } from '@supabase/supabase-js'
import { BrowserRouter,Routes, Route, useNavigate } from 'react-router-dom';

const supabase = createClient("https://lausmsnsiorkeapcznge.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdXNtc25zaW9ya2VhcGN6bmdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NDYxNTUsImV4cCI6MjAxNTQyMjE1NX0.mAxuPeIJ0UqPfv5UFJ7HYzEHxpAcW3HY_C4emmtRFvU")
export {supabase}


function App() {
  const [session, setSession] = useState(null);
  

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

 
    

  return (
   
     <div className="App">
<BrowserRouter>
<Routes>
    <Route path = "/login" element = {<Login />}/>
    <Route path = "/"  element = {<TodoWrapper />}/>
    <Route path = "/setUsername" element = {<UsernameForm/>}/>
</Routes>
   </BrowserRouter>
     </div>
  
  );

}



export default App;
