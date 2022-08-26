import { GameData } from './GameData'

interface Props {
  gameData : GameData
  handleMarkGameAsChecked(gameData : GameData) : void
  handleRemoveGame(gameData : GameData) : void
}



function GamePanelUpdated(props : Props) {
  const gameData = props.gameData;

  function handleClickMarkGameAsChecked() {
    props.handleMarkGameAsChecked(gameData);
  }

  function handleClickRemoveGame() {
    props.handleRemoveGame(gameData);
  }

  return (
    <div className='game-panel'>
      <h1 className='game-url'><a href={gameData.url}>{gameData.name}</a></h1>
      <hr />
      <h2 className='outdated'>Old name</h2>
      <p>{gameData.checked_name}</p>
      <h2 className='updated'>New name</h2>
      <p>{gameData.name}</p>
      <hr />
      <h2 className='outdated'>Old Description</h2>
      <p>{gameData.checked_description}</p>
      <h2 className='updated'>New Description</h2>
      <p>{gameData.description}</p>
      <hr />
      <h2 className='outdated'>Old Date Updated</h2>
      <p>{gameData.date_updated}</p>
      <h2 className='updated'>New Date Updated</h2>
      <p>{gameData.checked_date_updated}</p>
      <div className='button-container'>
        <button className='update-game-data-button' onClick={handleClickMarkGameAsChecked}>Mark As Checked</button>
        <button className='update-game-data-button' onClick={handleClickRemoveGame}>Remove Game</button>
      </div> 
    </div>
  )
}

export default GamePanelUpdated
