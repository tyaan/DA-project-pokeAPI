import { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { getPokemonFromName } from '../apiClient.ts'
import { Pokemon } from '../../models/pokemon.ts'

function SinglePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { name } = useParams()

  useEffect(() => {
    async function update() {
      const data = await getPokemonFromName(String(name))
      try {
        setPokemon(data)
      } catch (err) {
        setError(String(err))
      }
    }

    update()
  })

  if (error) return 'error in retriving pokemon data'

  if (!pokemon) return <>Loading...</>

  return (
    <div>
      <ul>
        <li>Name: {pokemon.name}</li>
        <li>
          Abilities:
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a.slot}>{a.ability.name}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default SinglePokemon
