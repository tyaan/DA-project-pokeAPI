import { Outlet } from 'react-router-dom'
import PokemonList from './PokemonList'

function App() {
  return (
    <div>
      <h1>Pokemon</h1>
      <div className="main">
        <div className="nav-list">
          <PokemonList />
        </div>
        <div className="pokemon-display">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default App
