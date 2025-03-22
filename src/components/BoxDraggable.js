import React, { useEffect } from "react"
import { observer } from "mobx-react"
import interact from "interactjs"
import debounce from "lodash.debounce"

function BoxDraggable(props) {
  const onToggleSelect = props.onToggleSelect
  const isSelected = props.isSelected
  const box = props.box
  useEffect(() => {
    interact(`#box-${props.id}`).draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: "parent", // Keep boxes within the canvas
          endOnly: true,
        }),
      ],
      listeners: {
        move: debounce((event) => {
          // Update box position using MobX action
          box.setPosition(box.left + event.dx, box.top + event.dy)
        }, 5), // Debounce with 100ms delay
      },
    })
    return () => {
      interact(`#box-${props.id}`).unset()
    }
  }, [box])

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
        border: isSelected ? "3px solid #FF5733" : "1px solid transparent",
      }}
    >
      {props.children}
    </div>
  )
}

export default observer(BoxDraggable)
