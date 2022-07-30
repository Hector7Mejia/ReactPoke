import PokemonList from './PokemonList'
import {useState,useEffect} from "react";
import Pagination from './Pagination';
import axios from "axios";

function App() {
  const [pokemon,setPokemon] = useState(["bulbasaur,charmander"]);
  const [currentPageUrl,setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
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
          setPokemon(res.data.results.map(p => p.name))
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
        <PokemonList pokemon={pokemon}/>
        <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/>
      </>
  );
}

export default App;
