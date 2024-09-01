import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors.js';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useRef, useState } from 'react';
import { searchMovie, getMovie } from '../api/movieApi.js';
import MovieCard from '../components/MovieCard.jsx';

const Search = () => {
  const [isLetter, setLetter] = useState(false);
  const inputRef = useRef(null);
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isAdditionalLoading, setAdditionalLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const maxPage = useRef(2);
  const timeRef = useRef(null);

  const handleSearch = (text) => {
    clearTimeout(timeRef.current);
    if (!text) {
      setLetter(false);
      setMovie([]);
      return;
    }

    setLetter(true);
    timeRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        let response = await searchMovie(text, 1);
        setPage(2);
        maxPage.current = response.total_pages;

        let resArray = await Promise.all(
          response.results.map(async (movieDetails) => {
            let ans = await getMovie(movieDetails.id);
            return ans;
          })
        );

        resArray = resArray.filter((val) => JSON.stringify(val) !== '{}');
        setMovie(resArray);
      } catch (error) {
        console.log('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  const loadMoreMovies = async () => {
    if (page > maxPage.current) return;

    setAdditionalLoading(true);
    try {
      let response = await searchMovie(text, page);
      setPage((prev) => prev + 1);
      maxPage.current = response.total_pages;

      let resArray = await Promise.all(
        response.results.map(async (movieDetails) => {
          let ans = await getMovie(movieDetails.id);
          return ans;
        })
      );

      resArray = resArray.filter((val) => JSON.stringify(val) !== '{}');
      setMovie((prev) => [...prev, ...resArray]);
    } catch (error) {
      console.log('Error fetching more movie data:', error);
    } finally {
      setAdditionalLoading(false);
    }
  };

  const clearInput = () => {
    inputRef.current.clear();
    setLetter(false);
    setMovie([]);
    setText('');
  };

  return (
    <SafeAreaView style={[{ flex: 1, padding: 20 }, styles.parent]}>
      <View>
        <TextInput
          style={styles.input}
          ref={inputRef}
          onChangeText={(text) => {
            setText(text);
            handleSearch(text);
          }}
          placeholder="Search for a movie..."
          placeholderTextColor="gray"
        />
        <TouchableOpacity style={styles.searchAndCross} onPress={clearInput}>
          {isLetter ? (
            <Entypo name="cross" size={24} color="white" />
          ) : (
            <AntDesign name="search1" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ paddingVertical: 20, paddingBottom: 30 }}>
        {isLoading ? (
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <ActivityIndicator size={30} color={'orange'} />
          </View>
        ) : (
          <FlatList
            data={movie}
            renderItem={({ item }) => <MovieCard movie={item} />}
            keyExtractor={(_, index) => index}
            contentContainerStyle={{
              alignItems: 'center',
              gap: 20,
              paddingBottom: 20,
            }}
            numColumns={2}
            onEndReached={loadMoreMovies}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isAdditionalLoading && (
                <ActivityIndicator size="large" color="orange" />
              )
            }
            showsVerticalScrollIndicator={false}
          />
        )}
        {!isLoading && isLetter && movie.length === 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              source={require('../assets/images/no-results.png')}
              style={{ width: 100, height: 100 }}
            />
            <Text style={{ color: 'gray', fontSize: 15 }}>
              No result is found
            </Text>
          </View>
        )}
        {!isLoading && !isLetter && movie.length === 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Image
              source={require('../assets/images/search-results.png')}
              style={{ width: 100, height: 100 }}
            />
            <Text style={{ color: 'gray', fontSize: 15 }}>
              Search result will apeear here
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
  },
  input: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingRight: 40,
    paddingHorizontal: 20,
    position: 'relative',
  },
  searchAndCross: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
});
