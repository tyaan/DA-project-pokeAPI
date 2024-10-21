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
      <h2>{pokemon.name}</h2>
      <img
        className="sprite-image"
        src={pokemon.sprites.front_default}
        alt="No sprite found for this pokemon"
      ></img>
      <ul>
        <li>
          <span className="bold">Height:</span> {pokemon.height / 10} metres
        </li>
        <li>
          <span className="bold">Weight:</span> {pokemon.weight / 10} Kg
        </li>
        <li>
          <span className="bold">Abilities:</span>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </li>
        <li>
          <span className="bold">Types:</span>
          <ul>
            {pokemon.types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

export default SinglePokemon
