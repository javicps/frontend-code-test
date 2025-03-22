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
        self.saveState()
      },
      removeSelectedBoxes() {
        self.boxes = self.boxes.filter(
          (box) => !self.selectedBoxIds.includes(box.id)
        )
        self.selectedBoxIds.clear()
        self.saveState()
      },
      toggleBoxSelection(id) {
        if (self.selectedBoxIds.includes(id)) {
          self.selectedBoxIds.remove(id)
        } else {
          self.selectedBoxIds.push(id)
        }
        self.saveState()
      },
      changeColor(newColor) {
        self.boxes.forEach((box) => {
          if (self.selectedBoxIds.includes(box.id)) {
            box.color = newColor
          }
        })
        self.saveState()
      },
      saveState() {
        // Save the state to localStorage
        const state = {
          boxes: self.boxes.map((box) => ({
            id: box.id,
            color: box.color,
            left: box.left,
            top: box.top,
            width: box.width,
            height: box.height,
          })),
          selectedBoxIds: self.selectedBoxIds,
        }
        localStorage.setItem("appState", JSON.stringify(state))
      },
      loadState() {
        // Load the state from localStorage
        const savedState = localStorage.getItem("appState")
        if (savedState) {
          const parsedState = JSON.parse(savedState)
          parsedState.boxes.forEach((box) => {
            self.addBox({
              id: box.id,
              color: box.color,
              top: box.top,
            })
            const boxModel = self.boxes.find((b) => b.id === box.id)
            boxModel.setPosition(box.left, box.top)
          })
          self.selectedBoxIds = parsedState.selectedBoxIds || []
        }
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
store.loadState()

export default store
