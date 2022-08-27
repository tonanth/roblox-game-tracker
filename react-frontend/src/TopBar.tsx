import { FormEventHandler, useState } from "react";

interface Props {
  handleAddNewURL (url : string): void;
  handleRefresh(): void;
}

function TopBar(props : Props) {

  const [url, setUrl] = useState('')


  function handleSubmit(e : any) {
    e.preventDefault()
    console.log("New url added : " + url);
    setUrl('');
    props.handleAddNewURL(url);
  }

  return(
    <div className="TopBar">
      <h1>Roblox Game Tracker</h1>
      <form onSubmit={handleSubmit}>
          <input className="url-entry-box" value={url} type="text" placeholder="ROBLOX Game URL" onChange={(text) => {setUrl(text.target.value)} } />
      </form>
      <button className='refresh-button' type='button' onClick={props.handleRefresh}>Refresh</button>
    </div>
  )
}

export default TopBar;