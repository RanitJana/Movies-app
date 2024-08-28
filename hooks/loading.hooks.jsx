import MovieCard from '../components/MovieCard.jsx';
import MovieSkeleton from '../components/MovieSkeleton.jsx';
import React from 'react'

const ShowComponent = ({ info }) => {

    return (
        info[0] ?
            Array.from({ length: 5 }).map((_, index) => (
                <MovieSkeleton key={index} />
            ))
            :
            info[1].map((movie, index) => {
                return <MovieCard movie={movie} key={index} />;
            })
    )
}

export default ShowComponent