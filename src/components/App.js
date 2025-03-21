import React, { useState } from "react"

import store from "../stores/MainStore"
import Canvas from "./Canvas"
import Toolbar from "./Toolbar"
import { observer } from "mobx-react"

function App() {
  return (
    <div className="app">
      <Toolbar addBox={store.addBox} />
      <Canvas store={store} />
    </div>
  )
}

export default observer(App)
