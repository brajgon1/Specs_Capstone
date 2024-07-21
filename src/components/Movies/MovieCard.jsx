import { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from "../Rating/Rating";
import './MovieCard.css';

const MovieCard = () => {

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
         try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const response = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`);
                setMovie(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchMovie();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching movie data</div>;
    }


    return(
        <div>
            <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="Movie Poster" />
                <h3>{movie.title}</h3>
                <p>Rating: <Rating rating={movie.vote_average} /></p>
            </div>

        </div>
    )
}

export default MovieCard;