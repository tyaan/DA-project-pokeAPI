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

  function nextList() {
    setListOffset(
      listOffset + LIST_LENGTH > collection.count
        ? listOffset
        : listOffset + LIST_LENGTH,
    )
  }

  function next10List() {
    setListOffset(
      listOffset + LIST_LENGTH * 10 > collection.count
        ? collection.count - (collection.count % LIST_LENGTH)
        : listOffset + LIST_LENGTH * 10,
    )
  }

  function prevList() {
    setListOffset(listOffset == 0 ? 0 : listOffset - LIST_LENGTH)
  }

  function prev10List() {
    setListOffset(
      listOffset - LIST_LENGTH * 10 < 0 ? 0 : listOffset - LIST_LENGTH * 10,
    )
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
        <button onClick={() => prev10List()}>{'<<'}</button>
        <button onClick={() => prevList()}>{'<'}</button>
        <span className="page-num">{listOffset / 20 + 1}</span>
        <button onClick={() => nextList()}>{'>'}</button>
        <button onClick={() => next10List()}>{'>>'}</button>
      </div>
    </div>
  )
}

export default PokemonList
