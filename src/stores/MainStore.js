import { types } from "mobx-state-tree"
import uuid from "uuid/v4"
import BoxModel from "./models/Box"
import { runInAction } from "mobx"

import { TimeTraveller } from "mst-middlewares"

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
    selectedBoxIds: types.array(types.string),
    history: types.optional(TimeTraveller, { targetPath: "../boxes" }),
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
        const newBoxes = self.boxes.filter(
          (box) => !self.selectedBoxIds.includes(box.id)
        )
        self.selectedBoxIds.clear()

        // Apply a snapshot to ensure history tracks the change
        self.boxes.replace(newBoxes)
        self.saveState()
      },
      moveSelectedBoxes(dx, dy) {
        runInAction(() => {
          self.selectedBoxes.forEach((box) => {
            box.setPosition(box.left + dx, box.top + dy)
          })
        })
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
      undo() {
        if (self.history.canUndo) self.history.undo()
        self.saveState()
      },
      redo() {
        if (self.history.canRedo) self.history.redo()
        self.saveState()
      },
      saveState() {
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
    get selectedBoxes() {
      return self.boxes.filter((box) => self.selectedBoxIds.includes(box.id))
    },
    count() {
      return self.selectedBoxIds.length
    },
    canUndo() {
      return self.history.canUndo
    },
    canRedo() {
      return self.history.canRedo
    },
  }))

const store = MainStore.create()
store.loadState()

export default store
