import React, {useEffect, useState} from 'react';
import TopBar from './TopBar';
import './App.css';
import { GameData } from './GameData'

async function serverIsActive(setServerStatus: Function) : Promise<void> {
    const response = await fetch('http://localhost:3001/status', {
      method: 'GET',
      mode: 'cors'
    }); 
    
    setServerStatus(response.status === 200);
    console.log(`The server response status is ${response.status}`);
}

async function serverGetGameData(processGameData: Function) : Promise<void> {
  const response = await fetch('http://localhost:3001/api/getgamedata', {
    method: 'GET',
    mode: 'cors',
  });
  const rawData : GameData[] = (await response.json()).rows;
  // const typedData = rawData.map((raw : any) => {
  //   const typed : GameData = {
  //     url: raw.url,
  //     name: raw.name,
  //     description: raw.description,
  //     date_updated: raw.date_updated,
  //     checked_name: raw.checked_name,
  //     checked_description: raw.checked_description,
  //     checked_date_updated: raw.checked_date_updated
  //   }
  //   return typed;
  // });
  console.log('Game data fetched from server');
  processGameData(rawData);
}

async function serverDeleteGame(url : string, serverRefreshGames: Function) : Promise<void> {
  const response = await fetch('http://localhost:3001/api/deletegame', {
    method: 'DELETE',
    mode: 'cors'
  });
  console.log(`Deleted game with url ${url}`)
}

async function serverAddGame(url: string, serverRefreshGames: Function) : Promise<void> {

}

function App() {

  const [nonUpdatedGames, setNonUpdatedGames] = useState<GameData[]>([]);
  const [updatedGames, setUpdatedGames] = useState<GameData[]>([]);
  const [serverStatus, setServerStatus] = useState<boolean>(false);

  serverIsActive(setServerStatus);
  handleRefresh()

  function handleRefresh() {
    serverGetGameData(processGameData)
  }

  function processGameData(gameData : GameData[]) {
    const updatedGames = gameData.filter(game => ((game.name !== game.checked_name) || (game.description !== game.checked_description) || (game.date_updated !== game.checked_date_updated)));
    const nonUpdatedGames = gameData.filter(game => ((game.name === game.checked_name) && (game.description === game.checked_description) && (game.date_updated === game.checked_date_updated)));
    // TODO: Add later
    // const nonProcessedGames = gameData.filter(game => ((game.name === null) && (game.description === null) && (game.date_updated === null)));
    setUpdatedGames(updatedGames);
    setNonUpdatedGames(nonUpdatedGames);
  }
  
  function handleAddNewURL(url : string) {
    
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
