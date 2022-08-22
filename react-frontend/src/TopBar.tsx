import { useState } from "react";

interface Props {
  handleAddNewURL (data : string): null;
  handleRefresh (): null
}

function TopBar(props : Props) {

  const [url, set_url] = useState('')

  return(
    <div className="TopBar">
      <h1>Roblox Game Tracker</h1>
      <form onSubmit={() => props.handleAddNewURL(url)}>
          <input className="game-entry-box" type="text" placeholder="ROBLOX Game URL" onChange={(text) => {set_url(text.target.value);}} />
      </form>
      <button className='refresh-button' type='button'>Refresh</button>
    </div>
  )
}

export default TopBar;