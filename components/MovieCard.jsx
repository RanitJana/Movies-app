import { View, Text, Image } from 'react-native'
import React from 'react'
import MovieBox from '../constants/MovieCss.js';

const getMonth = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}

function getDate(time) {
    let [year, month, day] = time.split('-');

    month = Number(month);

    return `${getMonth[month]} ${+day},${year}`
}
export { getDate }

const MovieCard = ({ movie }) => {

    return (
        <View style={MovieBox.box} >
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} style={MovieBox.image} />
            <Text numberOfLines={1} style={MovieBox.title}>{movie?.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                <Text style={MovieBox.date}>{getDate(movie.release_date)}</Text>
                <Text style={MovieBox.ratings}>{Number(movie.vote_average).toPrecision(2)}</Text>
            </View>
        </View >
    )
}

export default MovieCard;
