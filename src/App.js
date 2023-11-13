
import {TodoWrapper} from './components/TodoWrapper'
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.css';



function App() {

  

  return (
   
     <div className="App">
    
      <h1 className = 'title'> Your Future Awaits</h1>
      <TodoWrapper />
     </div>
  
  );
}

export default App;
