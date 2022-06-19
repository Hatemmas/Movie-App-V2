import React from 'react'

const MovieCard = ({movie, selectMovie}) => {
    
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
    
  return (
    <div className='movieCard' onClick={() => selectMovie(movie) }>
        {movie.poster_path ? <img className='poster' src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
        : <div className='posterPlaceholder'>No Poster Available</div>}
        <h3>{movie.title}</h3>
        {/* <p> {movie.overview} </p> */}
        <p> {`Release Date : ${movie.release_date}`} </p>
        <p> {`Rating : ${movie.vote_average} /10`} </p>
    </div>
  )
}

export default MovieCard