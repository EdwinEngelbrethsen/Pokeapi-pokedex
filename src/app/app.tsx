// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import PokemonCard from './components/Pokemon-card';

export function App() {
  return (
    <div>
      <h1>Pokedex</h1>
      <PokemonCard />
    </div>
  );
}

export default App;
