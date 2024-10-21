import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

import App from './components/App.tsx'
import SinglePokemon from './components/SinglePokemon.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path='pokemon/:name' element={<SinglePokemon/>}/>
  </Route>
),
)

export { router }
