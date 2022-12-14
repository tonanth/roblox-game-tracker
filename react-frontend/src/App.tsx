import React, {useEffect, useState} from 'react';
import TopBar from './TopBar';
import './App.css';
import { GameData } from './GameData'
import GamePanel from './GamePanel'
import GamePanelUpdated from './GamePanelUpdated'
import GamePanelUnprocessed from './GamePanelNonprocessed'

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

async function serverAddGameURL(url: string, serverRefreshGames: Function) : Promise<void> {
  const response = await fetch('http://localhost:3001/api/addgameurl', {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json' 
    },
    body: JSON.stringify({url: url})
  })
  serverRefreshGames();
}

async function serverDeleteGameByURL(url : string, serverRefreshGames: Function) : Promise<void> {
  const response = await fetch('http://localhost:3001/api/deletegamebyurl', {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({url : url})
  });
  console.log(`Deleted game with url ${url}`)
  serverRefreshGames();
}

async function serverUpdateGameData(gameData : GameData, serverRefreshGames: Function) : Promise<void> {
  const response = await fetch('http://localhost:3001/api/markgameaschecked', {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(gameData)
  })
}

function App() {

  const [nonUpdatedGames, setNonUpdatedGames] = useState<GameData[]>([]);
  const [updatedGames, setUpdatedGames] = useState<GameData[]>([]);
  const [unprocessedGames, setunprocessedGames] = useState<GameData[]>([])

  const [serverStatus, setServerStatus] = useState<boolean>(false);

  serverIsActive(setServerStatus);

  function handleRefresh() {
    serverGetGameData(processGameData)
  }

  function handleAddNewGameURL(url : string) {
    serverAddGameURL(url, handleRefresh)
  }

  function handleMarkGameAsChecked(gameData : GameData) {
    console.log(`Marking game with url ${gameData.url} as checked`)
    serverUpdateGameData(gameData, handleRefresh);
  }

  function handleRemoveGame(gameData : GameData){
    console.log(`Removing game with URL ${gameData.url}`)
    serverDeleteGameByURL(gameData.url, handleRefresh)
  }

  function processGameData(gameData : GameData[]) {
    const updatedGames = gameData.filter(game => ((game.name !== game.checked_name) || (game.description !== game.checked_description) || (game.date_updated !== game.checked_date_updated)));
    const nonUpdatedGames = gameData.filter(game => ((game.name === game.checked_name) && 
                                                     (game.description === game.checked_description) && 
                                                     (game.date_updated === game.checked_date_updated) && 
                                                     (game.name !== null) &&
                                                     (game.description !== null) && 
                                                     (game.date_updated !== null)));
    const unprocessedGames = gameData.filter(game => ((game.name === null) && (game.description === null) && (game.date_updated === null)));
    setUpdatedGames(updatedGames);
    setNonUpdatedGames(nonUpdatedGames);
    setunprocessedGames(unprocessedGames)
  }
  


  if(!serverStatus) 
    return (
      <h1>Cannot connect to server</h1>
    )
  else
    return (
      <div className="App">
        <TopBar handleAddNewURL={handleAddNewGameURL} handleRefresh={handleRefresh} />
        <div className='game-panel-container'>
          <h1 className='game-panel-container-description'>Updated Games</h1>
          {updatedGames.map((game) => 
            <div key={game.url}>
              <GamePanelUpdated gameData={game} handleMarkGameAsChecked={handleMarkGameAsChecked} handleRemoveGame={handleRemoveGame} />
            </div>
          )}
          <div className='game-panel-container'>
            <h1 className='game-panel-container-description'>Unupdated Games</h1>
            {nonUpdatedGames.map((game) => 
            <div key={game.url}>
              <GamePanel gameData={game} />
            </div>)}
          </div>
          <div className='game-panel-container'>
            <h1 className='game-panel-container-description'>Unprocessed Games</h1>
            {unprocessedGames.map((game) => 
            <div key={game.url}>
              <GamePanelUnprocessed gameData={game} />
            </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default App;
