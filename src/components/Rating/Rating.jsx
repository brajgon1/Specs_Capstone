import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import './Rating.css';

export default function Rating({ movieId, userId, noOfStars = 10 }) {
    const [rating, setRating] = useState(0);
    const [hovered, setHovered] = useState(0);

    useEffect(() => {
        console.log("userId:", userId, "movieId:", movieId);
        const getRating = async () => {
            try {
                const response = await axios.get('/rating', {
                    params: { user_id: userId, movie_id: movieId }
                });
                setRating(response.data.rating);
            } catch (error) {
                console.error('Error getting rating:', error);
            }
        }

        getRating();
    }, [movieId, userId])

    const handleClick = async (getCurrentIndex) => {
        setRating(getCurrentIndex);
        setHovered(getCurrentIndex);

        try {
            await axios.post('/rating', {
                user_id: userId,
                movie_id: movieId,
                rating: getCurrentIndex,
            });
            alert(`You rated this movie ${getCurrentIndex} stars!`)
        } catch (error) {
            console.error("Error submitted rating:", error);
            alert("Failed to submit rating");
        }
    }

    const handleMouseEnter = (getCurrentIndex) => {
        setHovered(getCurrentIndex);
    };

    const handleMouseLeave = () => {
        setHovered(rating);
    };

    return (
        <div className="star-rating">
            {
                [...Array(noOfStars)].map((_, index) => {
                index += 1

                    return (
                        <FaStar
                            key={index}
                            className={index <= (hovered || rating) ? 'active' : 'inactive'}
                            onClick={() => handleClick(index)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave()}
                            size={40}
                        />
                    );
                })
            }
        </div>
    );
}