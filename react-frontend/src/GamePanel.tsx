import { GameData } from './GameData'

interface Props {
  gameData: GameData
}

function GamePanel(props: Props) {
  const gameData = props.gameData
  return (
    <div className="game-panel">
      <h1>{gameData.url}</h1>
      <h2>Name</h2>
      <p>{gameData.name}</p>
      <h2>Description</h2>
      <p>{gameData.description}</p>
      <h2>Date Updated</h2>
      <p>{gameData.date_updated}</p>
    </div>
  )
}

export default GamePanel;