import { Dimensions, View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { getMovie } from "@/api/movieApi.js";
import { getPersons } from "@/api/peopleApi.js"
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors.js';
import { LinearGradient } from 'expo-linear-gradient';
import People from '../../components/People.jsx';
import Entypo from '@expo/vector-icons/Entypo';
const MovieOne = () => {
    const { width, height } = Dimensions.get('window');
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState(null);
    const [people, setPeople] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                let ans = await getMovie(id);
                setMovie(ans);
                console.log(ans);

                ans = await getPersons(id);
                setPeople(ans);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch movie details');
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: Colors.dark.background, flex: 1 }]}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.center, { backgroundColor: Colors.dark.background, flex: 1 }]}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: Colors.dark.background, color: Colors.dark.text, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} style={{ height: height / 1.5, width: width }} />
                <LinearGradient
                    colors={['transparent', 'rgba(23,23,23,1)', Colors.dark.background]}
                    style={{ width, height: height, position: 'absolute', bottom: 0 }}
                />
                <View style={{ padding: 10, marginTop: -height / 4 }}>
                    <Text style={styles.title}>{movie?.title}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{movie?.status}</Text>
                        <Entypo name="dot-single" size={24} color="gray" />
                        <Text style={styles.infoText}>{movie?.release_date.split('-')[0]}</Text>
                        <Entypo name="dot-single" size={24} color="gray" />
                        <Text style={styles.infoText}>{movie?.runtime} min</Text>
                    </View>
                    <View style={styles.genreContainer}>
                        {movie?.genres.map((val, index) => (
                            <Text style={styles.genre} key={index}>{val.name}</Text>
                        ))}
                    </View>
                    <View style={{ borderRadius: 3, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ paddingHorizontal: 10, borderTopLeftRadius: 3, borderBottomLeftRadius: 3, paddingVertical: 3, color: 'white', fontWeight: 'bold', backgroundColor: 'orangered' }}>Ratings</Text>
                        <Text style={{ paddingHorizontal: 10, paddingVertical: 3, borderTopRightRadius: 3, borderBottomRightRadius: 3, color: 'white', fontWeight: 'bold', backgroundColor: 'green' }}>{Number(movie?.vote_average | 0).toPrecision(2)}</Text>
                    </View>
                    <Text style={styles.overview}>{movie?.overview}</Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>Top Casts</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ marginVertical: 10 }}>
                        {people?.cast.map((person, index) => (
                            <People key={index} people={{ person }} />
                        ))}
                    </ScrollView>
                </View >
            </ScrollView >
        </View >

    );
};

export default MovieOne;

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginBottom: 10,
    },
    infoText: {
        color: 'white',
    },
    genreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    genre: {
        fontSize: 15,
        color: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    overview: {
        color: 'white',
        paddingVertical: 40,
        fontSize: 16,
    },
});
