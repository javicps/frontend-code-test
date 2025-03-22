import React, { useRef } from "react"
import { observer } from "mobx-react"
import Box from "../components/Box"

function Canvas({ store }) {
  const handleSelect = (id) => {
    store.toggleBoxSelection(id)
  }

  const canvasRef = useRef(null)

  return (
    <div className="canva" ref={canvasRef} id="canva">
      {store.boxes.map((box, index) => (
        <Box
          id={box.id}
          key={index}
          color={box.color}
          left={box.left}
          top={box.top}
          width={box.width}
          height={box.height}
          box={box}
          isSelected={store.isSelected(box.id)}
          count={store.count()}
          onToggleSelect={handleSelect}
          moveSelectedBoxes={store.moveSelectedBoxes}
          canvasRef={canvasRef}
        />
      ))}
    </div>
  )
}

export default observer(Canvas)
