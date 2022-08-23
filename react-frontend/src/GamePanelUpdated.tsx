interface Props {
  url : string,
  name : string, 
  description : string,
  date_updated : string,
  checked_name : string,
  checked_description : string,
  checked_date_updated : string
}

function GamePanelChanged(props : Props) {

  return (
    <div className='game-panel'>
      <h1>{props.url}</h1>
      <h2>Old name</h2>
      <p>{props.checked_name}</p>
      <h2>New name</h2>
      <p>{props.name}</p>
      <h2>Old Descrption</h2>
      <p>{props.checked_description}</p>
      <h2>New Description</h2>
      <p>{props.description}</p>
      <h2>Old Date Updated</h2>
      <p>{props.date_updated}</p>
      <h2>New Date Updated</h2>
      <p>{props.checked_date_updated}</p>
    </div>
  )
}

export default GamePanelChanged
