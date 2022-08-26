import { GameData } from './GameData'

interface Props {
  gameData: GameData
}

function GamePanel(props: Props) {
  const gameData = props.gameData;
  return (
    <div className="game-panel">
      <h1 className='game-url'><a href={gameData.url}>{gameData.name}</a></h1>
      <hr />
      <h2>Name</h2>
      <p>{gameData.name}</p>
      <hr />
      <h2>Description</h2>
      <p>{gameData.description}</p>
      <hr />
      <h2>Date Updated</h2>
      <p>{gameData.date_updated}</p>
    </div>
  )
}

export default GamePanel;