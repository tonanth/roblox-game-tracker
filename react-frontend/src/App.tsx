import React, {useState} from 'react';
import logo from './logo.svg';
import TopBar from './TopBar';
import './App.css';

// fetch('http://localhost:4321/').then(response => response.text()).then(data => console.log(data))

let url = 'roblox.com/games/12345'

const requestOptions = {
  method: 'PUT',
  headers: { 'content-type': 'application/json'},
  body: JSON.stringify({url: url})
}

fetch('http://localhost:4321/addurl', requestOptions)


function serverIsActive(callback : Function) : void {
    fetch('http://localhost:4321/').then(response => response.text()).then(text =>{callback(text === 'roblox-game-tracker')}).catch((error) => callback(false));
}

function App() {


  const [updatedGames, setUpdatedGames] = useState<string[]>([])
  const [serverStatus, setServerStatus] = useState<boolean>(false)

  serverIsActive(setServerStatus);

  function handleRefresh() {
    return null;
  }
  
  function handleAddNewURL(url : string) {
    handleRefresh()
    return null;
  }
  if(!serverStatus) 
    return (
      <h1>Cannot connect to server</h1>
    )
  else
    return (
      <div className="App">
        <TopBar handleAddNewURL={handleAddNewURL} handleRefresh={handleRefresh} />
      </div>
    );
}

export default App;
