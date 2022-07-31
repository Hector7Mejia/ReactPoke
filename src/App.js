import PokemonList from './PokemonList'
import {useState,useEffect} from "react";
import Pagination from './Pagination';
import axios from "axios";

function App() {
  const [pokemon,setPokemon] = useState(["bulbasaur,charmander"]);
  const [currentPageUrl,setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/clefairy');
  const [prevPageUrl,setPrevPageUrl] = useState();
  const [nextPageUrl,setNextPageUrl] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      let cancel;
      axios.get(currentPageUrl, {
          cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
          setLoading(false);
          setNextPageUrl(res.data.next)
          setPrevPageUrl(res.data.previous)
          // setPokemon(res.data.map(p => p.name))
          setPokemon(res.data.sprites.front_default)
          console.log(res.data)
      })

      return () => cancel()
    },[currentPageUrl])

if(loading) return "loading..";

function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
}

function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
}

  return (
      <>
          <img src={pokemon} alt="icons" />
        {/*<PokemonList pokemon={pokemon}/>*/}
        <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/>
      </>
  );
}

export default App;
