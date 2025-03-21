import React, { useState } from "react"
import uuid from "uuid/v4"
import getRandomColor from "../utils/getRandomColor"

function Toolbar({ store, count }) {
  const [color, setColor] = useState("#000000")

  const handleAddClick = () => {
    store.addBox({
      id: uuid(),
      color: getRandomColor(),
    })
  }

  const handleRemoveClick = () => {
    store.removeSelectedBoxes()
  }

  const handleColorChange = (e) => {
    const newColor = e.target.value
    setColor(newColor)
    store.changeColor(newColor)
  }

  return (
    <div className="toolbar">
      <button onClick={handleAddClick}>Add Box</button>
      <button onClick={handleRemoveClick}>Remove Box</button>

      <input type="color" value={color} onChange={handleColorChange} />
      <span>{count} box(es) selected</span>
    </div>
  )
}

export default Toolbar
