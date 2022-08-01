// import {useState} from "react";

export default function PokemonList({ pokemon }) {

    return (
        <div>
            {pokemon.map(p => (

                    <div key={p.id}>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${p.id}.svg`} alt="" />
                        {/*<img src={p.sprites.front_default} alt="" />*/}
                        <h2>{p.name}</h2>
                    </div>
            ))}
        </div>
        // <div>
        //     {pokemon}
        // </div>
    );
}