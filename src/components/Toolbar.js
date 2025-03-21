import React from "react"
import uuid from "uuid/v4"
import getRandomColor from "../utils/getRandomColor"

function Toolbar({ addBox }) {
  const handleClick = () => {
    addBox({
      id: uuid(),
      color: getRandomColor(),
    })
  }

  return (
    <div className="toolbar">
      <button onClick={handleClick}>Add Box</button>
      <button>Remove Box</button>
      <input type="color" />
      <span>No boxes selected</span>
    </div>
  )
}

export default Toolbar
