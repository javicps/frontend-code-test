import React, { useEffect } from "react"
import { observer } from "mobx-react"
import interact from "interactjs"

function BoxDraggable(props) {
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
        move(event) {
          box.setPosition(box.left + event.dx, box.top + event.dy)
        },
      },
    })
  }, [box])
  return (
    <div
      id={`box-${box.id}`}
      className="box"
      style={{
        position: "absolute",
        left: box.left,
        top: box.top,
        backgroundColor: props.color,
        width: props.width,
        height: props.height,
        transform: `translate(${props.left}px, ${props.top}px)`,
        cursor: "move",
      }}
    >
      {props.children}
    </div>
  )
}

export default observer(BoxDraggable)
