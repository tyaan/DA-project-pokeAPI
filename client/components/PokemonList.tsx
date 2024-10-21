import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

// import { getPokemonFromName } from '../apiClient.ts'
import { getAllPokemon } from '../apiClient.ts'
// import { Pokemon } from '../../models/pokemon'
import { AllPokemon } from '../../models/allPokemon.ts'

const LIST_LENGTH = 20

function PokemonList() {
  const [collection, setCollection] = useState<AllPokemon | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [listOffset, setListOffset] = useState<number>(0)

  useEffect(() => {
    async function update() {
      const data = await getAllPokemon(listOffset)
      try {
        setCollection(data)
      } catch (err) {
        setError(String(err))
      }
    }

    update()
  })

  if (error) return "There's an error!"

  if (!collection) return <>Loading...</>

  function nextPokemon() {
    setListOffset(listOffset + LIST_LENGTH)
  }

  function prevPokemon() {
    setListOffset(listOffset == 0 ? 0 : listOffset - LIST_LENGTH)
  }

  return (
    <div>
      <ul>
        {collection.results.map((result, idx) => (
          <li key={idx}>
            <Link to={'/pokemon/' + result.name}>{result.name}</Link>
          </li>
        ))}
      </ul>
      <div className="nav-buttons">
        <button onClick={() => prevPokemon()}>Prev</button>
        {listOffset / 20 + 1}
        <button onClick={() => nextPokemon()}>Next</button>
      </div>
    </div>
  )
}

export default PokemonList
