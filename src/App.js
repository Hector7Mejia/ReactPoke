import PokemonList from './PokemonList'
import {useState} from "react";

function App() {
  const [pokemon,setPokemon] = useState(["bulbasaur,charmander"]);

  return (
    <PokemonList pokemon={pokemon}/>
  );
}

export default App;
