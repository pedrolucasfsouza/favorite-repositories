import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios'

export default function Favorite(){    

    const [repos, setRepos] = useState([]);
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get('https://api.github.com/users/pedrolucasfsouza/repos')
            const dados = await response.data
            setRepos(dados)
            console.log(dados)
        }
        fetchData()
    }, [])

function handleFavorit(id) {
    const newRepos = repos.map(item => {
        return item.id === id ? {...item, favorite: !item.favorite} : item
    })
    setRepos(newRepos)
    
}

const Favorites = useCallback(()=>{
    const favorites = repos.filter(repo => repo.favorite === true)
    setFavorites(favorites)

})
useEffect(() =>{
    Favorites()
},[repos])


function number(){
    return favorites.length
}

    return(
<>
<h1>Repositórios</h1>

<ul>
                {<h1>Atualmente você tem {number()} favoritos</h1>}
                {favorites.map( item => (
                    <p>{item.name}</p>
                ))}
                {repos.map(item => (
                    <>
                        <li key={item.id}>{item.name}</li>
                        {item.favorite && <span>(Favorito)</span>}
                        <button onClick={()=>handleFavorit(item.id)}>Favoritar</button>
                    </>
                ))}
            </ul>
        </>


    )
}