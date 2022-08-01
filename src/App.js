import PokemonList from './PokemonList'
import {useState,useEffect} from "react";
import Pagination from './Pagination';
import axios from "axios";

function App() {
  const [pokemon,setPokemon] = useState(["bulbasaur,charmander"]);
  const [currentPageUrl,setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [prevPageUrl,setPrevPageUrl] = useState();
  const [nextPageUrl,setNextPageUrl] = useState();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      let cancel;
      axios.get(currentPageUrl, {
          cancelToken: new axios.CancelToken(c => cancel = c)
      }).then(res => {
          setNextPageUrl(res.data.next)
          setPrevPageUrl(res.data.previous)
          // setPokemon(res.data.results.map(p => p.name))
          getPokemon(res.data.results)
          // setPokemon(res.data.map(m => m.name))
          // setPokemon(res.data.sprites.front_default)
          // console.log(res.data)
          setLoading(false);
      })

      return () => cancel()
    },[currentPageUrl])

    const getPokemon = async(res) => {
      res.map(async(item)=> {
          const result = await axios.get(item.url)
          console.log(result.data)
          setPokemon(state=>{
              state=[...state,result.data]
              return state;
          })
      })
    }

if(loading) return "loading..";

function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
    setPokemon([])
}

function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
    setPokemon([])
}

  return (
      <>
          {/*<img src={pokemon} alt="icons" />*/}
        <PokemonList pokemon={pokemon}/>
        <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}/>
      </>
  );
}

export default App;
