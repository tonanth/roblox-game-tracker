import { GameData } from './GameData'

interface Props {
  gameData : GameData
}



function GamePanelUpdated(props : Props) {
  const gameData = props.gameData;
  return (
    <div className='game-panel'>
      <h1>{gameData.url}</h1>
      <h2>Old name</h2>
      <p>{gameData.checked_name}</p>
      <h2>New name</h2>
      <p>{gameData.name}</p>
      <h2>Old Descrption</h2>
      <p>{gameData.checked_description}</p>
      <h2>New Description</h2>
      <p>{gameData.description}</p>
      <h2>Old Date Updated</h2>
      <p>{gameData.date_updated}</p>
      <h2>New Date Updated</h2>
      <p>{gameData.checked_date_updated}</p>
    </div>
  )
}

export default GamePanelUpdated
