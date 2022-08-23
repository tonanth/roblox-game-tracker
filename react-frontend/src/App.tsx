import React, {useEffect, useState} from 'react';
import TopBar from './TopBar';
import './App.css';

// fetch('http://localhost:4321/').then(response => response.text()).then(data => console.log(data))

async function serverIsActive(callback: Function) : Promise<null> {
    const response = await fetch('http://localhost:3001/status', {
      method: 'GET',
      mode: 'cors'
    }); 
    
    callback(response.status === 200);
    console.log(response.status);

    return null;
}

function App() {


  const [updatedGames, setUpdatedGames] = useState<string[]>([])
  const [serverStatus, setServerStatus] = useState<boolean>(false)

  serverIsActive(setServerStatus);
  

  function handleRefresh() {
    console.log("refreshing");
  }
  
  function handleAddNewURL(url : string) {
    handleRefresh()
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
