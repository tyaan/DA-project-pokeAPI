// import request from 'superagent'
// import { AmiiboCollection } from '../models/amiibo.ts'

// *** EXAMPLE ***
// export async function getAmiiboWithName(
//   name: string
// ): Promise<AmiiboCollection> {
//   const response = await request
//     .get(`https://www.amiiboapi.com/api/amiibo/`)
//     .query({ name })

//   return response.body
// }
// ***   ***   ***

import request from 'superagent'
import { Pokemon } from '../models/pokemon'
import { AllPokemon } from '../models/allPokemon'

export async function getPokemonFromName(name: string): Promise<Pokemon> {
  const response = await request.get(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
  )

  return response.body
}

export async function getPokemonFromURL(url: string): Promise<Pokemon> {
  const response = await request.get(url)

  return response.body
}

export async function getAllPokemon(offset: number): Promise<AllPokemon> {
  const response = await request.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}`,
  )

  return response.body
}
