import axios from 'axios';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import './App.css';
import MovieCard from './components/MovieCard';


function App() {

  const [movies, setMovies] = useState([])
  const [selectMovies, setSelectMovies] = useState({})
  const [searchKey, setSearchKey] = useState("")
  const [playTrailer, setPlayTrailer] = useState(false)
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original"

const fetchMovies = async (searchKey) => {
  const type = searchKey ? "search" : "discover"
  const query= `&query=${searchKey}`
  const {data: {results}} = await axios.get (`https://api.themoviedb.org/3/${type}/movie?api_key=25ed1b7dbff456651f1b6e553eb294c8${query}`)
  await selectMovieT(results[0])
  setMovies(results)
}

const fetchMovie = async (id) => {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=25ed1b7dbff456651f1b6e553eb294c8&append_to_response=videos`)
  return data
}

const selectMovieT = async (movie) => {
  setPlayTrailer(false)
  const data = await fetchMovie(movie.id)
  console.log('movie dat', data)
  setSelectMovies(data)
}

useEffect (() => {
  fetchMovies()
}, [])

const renderMovies = () => (movies.map (movie => (<MovieCard key={movie.id} movie={movie} selectMovie={selectMovieT}/>) ))

const searchMovies = (e) => {
  e.preventDefault()
  fetchMovies(searchKey)
}

const renderTrailer = () => {
  const trailer = selectMovies.videos.results.find(vid => vid.name === 'Official Trailer')
  const key = trailer ? trailer.key : selectMovies.videos.results[0].key

  return ( <YouTube 
              videoId={key} 
              className="youtube-container"
              opts={{width: "100%", 
                     height: "100%", 
                     playerVars: {
                      autoplay: 1
                     }}}
    /> )
}


  return (
    <div className="App">
        <header className='headerContent centerMax'>
           <h1>Movie APP <span>2.0</span></h1>
          <form onSubmit={searchMovies}>
            <input type="text" onChange={(e) => setSearchKey (e.target.value) }/>
            <button type={"submit"}> <img src='https://icon-library.com/images/search-icon-svg/search-icon-svg-5.jpg' height={'20px'} width={'20px'} /> </button>
          </form>
          <img src={'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg'} height={'100px'} width={'100px'} />
        </header>

        <div className='board' style={{backgroundImage: `url('${IMAGE_PATH}${selectMovies.backdrop_path}')`}}>
         
          <div className='boardContent centerMax'>
            { playTrailer ? <button className='boardButton boardButtonClose' onClick={() => setPlayTrailer(false)}>Close</button> : null}
            {selectMovies.videos && playTrailer ? renderTrailer() : null}
            <button className='boardButton' onClick={ () => setPlayTrailer(true)}>Watch Trailer</button>
            <h1>{selectMovies.title}</h1>
            <p>{selectMovies.overview}</p>
          </div>
        </div>

        <div className='container centerMax'> 
          {renderMovies()} 
        </div>

    </div>
  );
}

export default App;
