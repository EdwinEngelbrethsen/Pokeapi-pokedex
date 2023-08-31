import { PokemonClient } from 'pokenode-ts';
import { useState } from 'react';

export default function PokemonCard() {
  const api = new PokemonClient();
  const [pokemon, setPokemon] = useState('');

  const fetchPokemonByName = async (pokemon: string) => {
    try {
      await api.getPokemonByName(pokemon).then((data) => {
        setPokemon(data.name);
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>{pokemon}</h1>
      <p></p>
      <p></p>
      <input
        placeholder="type in a pokemon"
        value={pokemon}
        onChange={(event) => setPokemon(event.target.value)}
        type={pokemon}
      ></input>

      <button
        onClick={(e) => {
          fetchPokemonByName(pokemon);
        }}
      >
        Search
      </button>
    </div>
  );
}
