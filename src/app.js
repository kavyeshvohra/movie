import React, { useEffect, useState } from 'react';
import './App.css'
import Search from './search.svg'
import MovieCard from './movieCard';
//bf5ba96e
const API_URL = 'http://www.omdbapi.com/?apikey=bf5ba96e'
const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        return data;
    }
    useEffect(()=>{
        searchMovies('Spiderman')
        .then(data=>{
            setMovies(data.Search);
        });
    },[])

    return(
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input placeholder='Search For Movies' value={searchTerm}
                onChange={(e)=>{setSearchTerm(e.target.value); }}
                onInputCapture={()=>{searchMovies(searchTerm).then(data=>setMovies(data.Search))}}/>
                <img src = {Search} alt="Search"/>
            </div>
            {
                movies?.length > 0 
                ? (
                <div className='container'>
                    {
                        movies.map((movie, index) => {
                            return <MovieCard key={index} movie={movie}/>
                        })  
                    }
                </div>
                ):(
                    <div className='empty'>
                        <h2>No Movies Found!</h2>
                    </div>
                )

            }
        </div>
    )
}

export default App;