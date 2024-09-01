import {
  Dimensions,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { getMovie, getSimilarMovies } from '@/api/movieApi.js';
import { getPersons } from '@/api/peopleApi.js';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors.js';
import { LinearGradient } from 'expo-linear-gradient';
import ShowComponent from '@/hooks/loading.hooks.jsx';
import People from '@/components/People.jsx';
import Production from '@/components/Production.jsx';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const MovieOne = () => {
  const { width, height } = Dimensions.get('window');
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [people, setPeople] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const movieData = await getMovie(id);
        setMovie(movieData);

        const peopleData = await getPersons(id);
        setPeople(peopleData);

        const similarMovies = await getSimilarMovies(id);
        setSimilar(similarMovies);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.center, styles.container]}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, styles.container]}>
        <Text style={styles.retryText}>Unable to fetch data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => router.replace('/')} style={styles.home}>
          <MaterialCommunityIcons name="home-variant" size={25} color="white" />
        </Pressable>
        <Link href={`${movie?.homepage}`} style={[styles.link, { zIndex: 3 }]}>
          <Pressable style={[styles.link, { height: 35 }]}>
            <MaterialCommunityIcons
              name="link-variant"
              size={25}
              color="white"
            />
          </Pressable>
        </Link>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
          }}
          style={{ height: height / 1.5, width: width }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(23,23,23,1)', Colors.dark.background]}
          style={{
            width,
            height: height * 1.5,
            position: 'absolute',
            top: -150,
          }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <Text style={styles.tagline}>{movie?.tagline}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{movie?.status}</Text>
            <Entypo name="dot-single" size={24} color="gray" />
            <Text style={styles.infoText}>
              {movie?.release_date.split('-')[0]}
            </Text>
            <Entypo name="dot-single" size={24} color="gray" />
            <Text style={styles.infoText}>{movie?.runtime} min</Text>
          </View>
          <View style={styles.genreContainer}>
            {movie?.genres.map((val, index) => (
              <Text style={styles.genre} key={index}>
                {val.name}
              </Text>
            ))}
          </View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.ratingsLabel}>Ratings</Text>
            <Text style={styles.ratingsValue}>
              {Number(movie?.vote_average | 0).toPrecision(2)}
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overview}>
            {movie?.overview || 'No data is provided for this movie'}
          </Text>
          <Text style={styles.sectionTitle}>Top Casts</Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.castScrollView}
          >
            {(people &&
              people.cast.length > 0 &&
              people.cast.map((person, index) => (
                <People key={index} people={{ person }} />
              ))) || (
              <Text style={{ color: 'gray', fontSize: 16 }}>
                No data is provided
              </Text>
            )}
          </ScrollView>
          <Text style={styles.sectionTitle}>Production Companies</Text>
          <View style={styles.companParent}>
            {(movie &&
              movie.production_companies.length > 0 &&
              movie.production_companies.map((company, index) => {
                if (JSON.stringify(company) != '{}')
                  return <Production key={index} company={{ company }} />;
              })) || (
              <Text style={{ color: 'gray', fontSize: 16 }}>
                No data is provided
              </Text>
            )}
          </View>
          <View style={styles.similarMoviesContainer}>
            {similar.results?.length > 0 && (
              <View style={styles.parentShowAll}>
                <Text style={styles.listDescriptionText}>
                  <MaterialCommunityIcons
                    name="square-rounded"
                    size={24}
                    color="orange"
                    style={{ marginRight: 10 }}
                  />
                  <Text>Similar movies</Text>
                </Text>
                <Pressable onPress={() => router.push(`/all/${id}`)}>
                  <Text style={styles.showAll}>show all</Text>
                </Pressable>
              </View>
            )}
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              style={styles.similarScrollView}
            >
              <ShowComponent info={[loading, similar.results]} />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieOne;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 10,
    marginTop: '-30%',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  tagline: {
    paddingHorizontal: 20,
    color: 'gray',
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
    flexWrap: 'wrap',
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
    paddingVertical: 5,
  },
  ratingsContainer: {
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  ratingsLabel: {
    paddingHorizontal: 10,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    paddingVertical: 3,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'orangered',
  },
  ratingsValue: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'green',
  },
  sectionTitle: {
    paddingVertical: 20,
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  overview: {
    color: 'gray',
    fontSize: 16,
  },
  castScrollView: {
    marginVertical: 10,
  },
  similarMoviesContainer: {
    marginBottom: 20,
  },
  parentShowAll: {
    paddingVertical: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listDescriptionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  showAll: {
    color: 'orange',
  },
  similarScrollView: {
    marginLeft: -10,
  },
  home: {
    width: 35,
    aspectRatio: 1,
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgb(255, 111, 0)',
    zIndex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    width: 35,
    aspectRatio: 1,
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 111, 0, 0.15)',
    zIndex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companParent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
});
