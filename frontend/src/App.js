import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from "../src/Pages/HomePage.js"
import Chatpage from "../src/Pages/ChatPage.js"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Homepage} />
        <Route path='/chats' Component={Chatpage}/>
      </Routes>
    </div>
  );
}

export default App;
