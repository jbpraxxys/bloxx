import type { FC } from 'react'
import { Toolbar } from './components/shell/Toolbar'
import { CanvasContainer } from './components/canvas/CanvasContainer'
import { BlockLibrary } from './components/shell/BlockLibrary'

const App: FC = () => {
  return (
    <div className="bloxx-app">
      <Toolbar />
      <div className="bloxx-main">
        <BlockLibrary />
        <CanvasContainer />
      </div>
    </div>
  )
}

export default App
