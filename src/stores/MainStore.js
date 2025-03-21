import { types } from "mobx-state-tree"
import uuid from "uuid/v4"
import BoxModel from "./models/Box"
import getRandomColor from "../utils/getRandomColor"

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
    selectedBoxIds: types.array(types.string),
  })
  .actions((self) => {
    return {
      addBox(box) {
        const newBox = BoxModel.create({
          id: box.id || uuid(),
          color: box.color,
          top: box.top || 100,
        })
        self.boxes.push(newBox)
      },
      removeSelectedBoxes() {
        self.boxes = self.boxes.filter(
          (box) => !self.selectedBoxIds.includes(box.id)
        )
        self.selectedBoxIds.clear() // Clear selected boxes after removal
      },
      toggleBoxSelection(id) {
        if (self.selectedBoxIds.includes(id)) {
          self.selectedBoxIds.remove(id)
        } else {
          self.selectedBoxIds.push(id)
        }
      },
      changeColor(newColor) {
        self.boxes.forEach((box) => {
          if (self.selectedBoxIds.includes(box.id)) {
            box.color = newColor
          }
        })
      },
    }
  })
  .views((self) => ({
    isSelected(id) {
      return self.selectedBoxIds.includes(id)
    },
    count() {
      return self.selectedBoxIds.length
    },
  }))

const store = MainStore.create()

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0,
})

store.addBox(box1)

export default store
