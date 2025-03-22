import React, { useEffect } from "react"
import { observer } from "mobx-react"
import interact from "interactjs"
import debounce from "lodash.debounce"

function BoxDraggable(props) {
  const onToggleSelect = props.onToggleSelect
  const isSelected = props.isSelected
  const box = props.box
  const store = props.store
  const canvasRef = props.canvasRef
  useEffect(() => {
    interact(`#box-${props.id}`).draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: canvasRef.current, // Keep boxes within the canvas
          endOnly: true,
          restrictRect: { top: 150, left: 0, bottom: 1, right: 1 },
        }),
      ],
      listeners: {
        move: debounce((event) => {
          const dx = event.dx
          const dy = event.dy

          // If box is selected, move all selected boxes
          if (isSelected) {
            store.moveSelectedBoxes(dx, dy)
          } else {
            box.setPosition(box.left + dx, box.top + dy)
          }
        }, 5), // Debounce with 100ms delay
      },
    })
    return () => {
      interact(`#box-${props.id}`).unset()
    }
  }, [box, isSelected])

  const handleClick = (e) => {
    if (!e.target.classList.contains("dragging")) {
      onToggleSelect(box.id)
    }
  }

  return (
    <div
      id={`box-${box.id}`}
      className="box"
      onClick={handleClick}
      style={{
        position: "absolute",
        left: box.left,
        top: box.top,
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        transform: `translate(${props.left}px, ${props.top}px)`,
        cursor: "move",
        border: isSelected ? "3px solid #FF5733" : "3px solid transparent",
      }}
    >
      {props.children}
    </div>
  )
}

export default observer(BoxDraggable)
