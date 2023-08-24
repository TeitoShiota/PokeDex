import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// import context
import { PokedexContext, PokedexProvider } from './contexts/PokedexContext.jsx'

// Pages and Routes
import Root from "./routes/root";
import Home from "./routes/Home";
import ErrorPage from './error-page.jsx';
import Pokedex from './routes/Pokedex.jsx'; 
import Pokemon from './routes/Pokemon.jsx';
import PokemonEntry from './routes/PokemonEntry.jsx';

// import CSS
import './index.scss'
//import './styles/normalize.scss'
import './styles/__type-colors.scss'



// router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "pokedex",
        element: <Pokedex />,
      },
      {
        path: "pokemon",
        element: <Pokemon />,
        children: [
          {
            path: ":id",
            element: <PokemonEntry/>,
          },
        ]
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PokedexProvider>
      <RouterProvider router={router} />
    </PokedexProvider>
  </React.StrictMode>,
)
