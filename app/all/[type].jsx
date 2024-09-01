import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Colors } from '@/constants/Colors.js';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import MovieCard from '../../components/MovieCard';
import {
  getUpcoming,
  getPopular,
  getTopRated,
  getSimilarMovies,
} from '../../api/movieApi';

const Type = () => {
  let { type } = useLocalSearchParams();
  const navigatin = useNavigation();

  useEffect(() => {
    navigatin.setOptions({
      headerTitle: Number.isInteger(+type) ? 'Similar movies' : type,
    });
  }, []);

  const [isAdditionalLoading, setAdditionalLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  let maxPage = useRef(2);

  const loadMoreMovies = async () => {
    if (page > maxPage.current) return;

    setAdditionalLoading(true);
    try {
      let response = await (Number.isInteger(+type)
        ? getSimilarMovies(+type, page).then((res) => res.results)
        : type.toLowerCase().replace(' ', '_') == 'popular'
          ? getPopular(page)
          : type.toLowerCase().replace(' ', '_') == 'upcoming'
            ? getUpcoming(page)
            : getTopRated(page));

      setPage((prev) => prev + 1);
      maxPage.current = response.total_pages || maxPage.current;

      response = response.filter((val) => JSON.stringify(val) !== '{}');
      setMovie((prev) => [...prev, ...response]);
    } catch (error) {
      console.log('Error fetching more movie data:', error);
    } finally {
      setAdditionalLoading(false);
    }
  };

  return (
    <SafeAreaView style={[{ flex: 1, paddingBottom: 20 }, styles.parent]}>
      <View>
        <FlatList
          data={movie}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(_, index) => index}
          numColumns={2}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 20,
            paddingBottom: 30,
          }}
          style={{ paddingTop: 20, marginTop: -35 }}
          onEndReached={loadMoreMovies}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isAdditionalLoading && (
              <ActivityIndicator size="large" color="orange" />
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Type;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
  },
});
