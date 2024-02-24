// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react'
import styles from './app.module.scss'
import { PokemonClient } from 'pokenode-ts'

export function App() {
    const client = new PokemonClient()
    const [inputText, setInputText] = useState('')
    const [pokemon, setPokemon] = useState([
        {
            name: '',
            id: 0,
            sprite: '',
        },
    ])

    function searchPokemon() {
        client.getPokemonByName(inputText.toLocaleLowerCase()).then((response) => {
            setPokemon([
                {
                    name: response.name,
                    id: response.id,
                    sprite: response.sprites.front_default ?? '',
                },
            ])
        })
    }

    async function showPokemonList() {
        await client.listPokemons(0, 20).then((response) => {
            setPokemon(
                response.results.map((pokemon, index) => {
                    return {
                        name: pokemon.name,
                        id: index + 1,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                    }
                }),
            )
        })
    }

    useEffect(() => {
        showPokemonList()
    }, [])

    return (
        <div>
            <div>
                <ul>
                    {pokemon.map((poke) => (
                        <li key={poke.id}>
                            <img
                                src={poke.sprite}
                                alt={poke.name}
                            />
                            <p>{poke.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <input
                type="text"
                onChange={(e) => setInputText(e.target.value)}
            />
            {/* <button onClick={searchPokemon}>Search</button> */}
        </div>
    )
}

export default App
