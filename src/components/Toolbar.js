import React from "react"
import uuid from "uuid/v4"

function Toolbar({ addBox }) {
  const handleClick = () => {
    addBox({
      id: uuid(),
      width: 150,
      height: 150,
      color: "#3498db",
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
