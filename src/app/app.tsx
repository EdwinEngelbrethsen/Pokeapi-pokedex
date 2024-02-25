import { useEffect, useState } from 'react'
import styles from '../index.css'
import { PokemonClient } from 'pokenode-ts'

export function App() {
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
        <div className="bg-gray-700 w-full full">
            <div className="flex flex-row">
                <ul className="flex flex-wrap">
                    {pokemon.map((poke) => (
                        <li
                            key={poke.id}
                            className="bg-blue-500 p-6 m-4"
                        >
                            <img
                                src={poke.sprite}
                                alt={poke.name}
                            />
                            <p className="text-3xl">{poke.name}</p>
                            <p>#{poke.id}</p>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <input
                type="text"
                onChange={(e) => setInputText(e.target.value)}
            /> */}
            {/* <button onClick={searchPokemon}>Search</button> */}
        </div>
    )
}

export default App
