import { GameData } from './GameData'

interface Props {
  gameData: GameData
}

function GamePanelNonprocessed(props : Props) {
  const gameData = props.gameData;
  return (
    <div className='game-panel'>
      <p className='game-url'><a href={gameData.url}>{gameData.url}</a></p>
    </div>
  );
}

export default GamePanelNonprocessed;