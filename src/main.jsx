import React from 'react'
import ReactDOM from 'react-dom/client'


// import context
import { PokedexContext, PokedexProvider } from './contexts/PokedexContext.jsx'

// import components
import App from './App.jsx'

// import CSS
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PokedexProvider>
      <App />
    </PokedexProvider>
  </React.StrictMode>,
)
