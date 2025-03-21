import { types } from "mobx-state-tree"
import uuid from "uuid/v4"
import BoxModel from "./models/Box"
import getRandomColor from "../utils/getRandomColor"

const MainStore = types
  .model("MainStore", {
    boxes: types.array(BoxModel),
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
    }
  })
  .views((self) => ({}))

const store = MainStore.create()

const box1 = BoxModel.create({
  id: uuid(),
  color: getRandomColor(),
  left: 0,
  top: 0,
})

store.addBox(box1)

export default store
