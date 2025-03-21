import React, { useEffect } from "react"

import store from "../stores/MainStore"
import Canvas from "./Canvas"
import Toolbar from "./Toolbar"
import { observer } from "mobx-react"

function App() {
  return (
    <div className="app">
      <Toolbar store={store} count={store.selectedBoxIds.length} />
      <Canvas store={store} />
    </div>
  )
}

export default observer(App)
