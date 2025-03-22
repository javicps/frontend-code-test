import React, { useEffect } from "react"
import { observer } from "mobx-react"
import interact from "interactjs"
import debounce from "lodash.debounce"

function BoxDraggable(props) {
  const { onToggleSelect, isSelected, box, moveSelectedBoxes, canvasRef } =
    props

  useEffect(() => {
    interact(`#box-${props.id}`).draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: canvasRef.current, // Restrict movement within the canvas
        }),
      ],

      listeners: {
        move: debounce((event) => {
          const dx = event.dx
          const dy = event.dy

          // If box is selected, move all selected boxes
          if (isSelected) {
            moveSelectedBoxes(dx, dy)
          } else {
            box.setPosition(box.left + dx, box.top + dy)
          }
        }, 10), // Debounce with 10ms delay
      },
    })
    return () => {
      interact(`#box-${props.id}`).unset()
    }
  }, [box, isSelected, moveSelectedBoxes, props.id, canvasRef])

  const handleClick = (e) => {
    if (!e.target.classList.contains("dragging")) {
      onToggleSelect(box.id)
    }
  }

  return (
    <div
      id={`box-${box.id}`}
      className={isSelected ? "box selected-box" : "box"}
      onClick={handleClick}
      style={{
        position: "absolute",
        left: box.left,
        top: box.top,
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        cursor: "move",
      }}
    >
      {props.children}
    </div>
  )
}

export default observer(BoxDraggable)
