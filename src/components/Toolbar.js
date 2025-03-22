import React, { useState, useCallback } from "react"
import uuid from "uuid/v4"
import getRandomColor from "../utils/getRandomColor"
import debounce from "lodash.debounce"

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

  const debouncedColorChange = useCallback(
    debounce((color) => {
      store.changeColor(color)
    }, 200), // Debounce for 500ms (adjust as needed)
    []
  )

  const handleColorChange = (e) => {
    const newColor = e.target.value
    setColor(newColor)
    debouncedColorChange(newColor)
  }

  const handleUndo = () => {
    store.undo()
  }

  const handleRedo = () => {
    store.redo()
  }

  return (
    <div className="toolbar">
      <button onClick={handleAddClick}>Add Box</button>
      <button onClick={handleRemoveClick} disabled={store.count() <= 0}>
        Remove Box
      </button>

      <input type="color" value={color} onChange={handleColorChange} />
      <button onClick={handleUndo} disabled={!store.canUndo}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={!store.canRedo}>
        Redo
      </button>
      <span>{count} box(es) selected</span>
    </div>
  )
}

export default Toolbar
