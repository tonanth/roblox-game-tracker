interface Props {
  url: string,
  name: string,
  description: string,
  date_updated: string
}

function GamePanel(props: Props) {
  return (
    <div className="game-panel">
      <h1>{props.url}</h1>
      <h2>Name</h2>
      <p>{props.name}</p>
      <h2>Description</h2>
      <p>{props.description}</p>
      <h2>Date Updated</h2>
      <p>{props.date_updated}</p>
    </div>
  )
}

export default GamePanel;