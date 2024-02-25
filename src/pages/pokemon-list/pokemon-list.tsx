import { PokemonClient } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import PokemonCard from 'src/components/pokemon-card'

export function PokemonList() {
    const client = new PokemonClient({ logs: true })
    const [inputText, setInputText] = useState('')
    const [pokemon, setPokemon] = useState([
        {
            name: '',
            id: 0,
            sprite: '',
        },
    ])

    function searchPokemon() {
        client
            .getPokemonByName(inputText.toLocaleLowerCase())
            .then((response) => {
                setPokemon([
                    {
                        name: response.name,
                        id: response.id,
                        sprite: response.sprites.front_default ?? '',
                    },
                ])
            })
            .catch((error) => {
                console.error(error)
            })
    }

    async function showPokemonList() {
        await client
            .listPokemons(0, 151)
            .then((response) => {
                setPokemon(
                    response.results.map((pokemon, index) => {
                        return {
                            name: pokemon.name,
                            id: index + 1,
                            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                        }
                    }),
                )

                console.log(response)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        showPokemonList()
    }, [])
    return (
        <div className="flex flex-wrap">
            {pokemon.map((pokemons) => {
                return (
                    <PokemonCard
                        key={pokemons.id}
                        name={pokemons.name}
                        id={pokemons.id}
                        sprite={pokemons.sprite}
                    />
                )
            })}
        </div>
    )
}

export default PokemonList
