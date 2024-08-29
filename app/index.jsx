import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../constants/Colors.js';
import { getPopular, getTopRated, getTrending, getUpcoming } from '../api/movieApi.js';
import ShowComponent from '../hooks/loading.hooks.jsx';

export default function Index() {
  const [data, setData] = useState({
    trending: { movies: [], fetching: true },
    upcoming: { movies: [], fetching: true },
    popular: { movies: [], fetching: true },
    topRated: { movies: [], fetching: true },
  });

  useEffect(() => {
    const fetchData = async () => {
      const trendingMovies = await getTrending();
      const upcomingMovies = await getUpcoming();
      const popularMovies = await getPopular();
      const topRatedMovies = await getTopRated();

      setData({
        trending: { movies: trendingMovies, fetching: false },
        upcoming: { movies: upcomingMovies, fetching: false },
        popular: { movies: popularMovies, fetching: false },
        topRated: { movies: topRatedMovies, fetching: false },
      });
    };

    fetchData();
  }, []);

  const renderCategory = (title, showAll, data) => (
    <View>
      <View style={styles.parentShowAll}>
        <Text style={styles.listDescriptionText}>{title}</Text>
        {showAll && <Text style={styles.showAll}>show all</Text>}
      </View>
      <ScrollView style={{ marginLeft: -20 }} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
        <ShowComponent info={[data.fetching, data.movies]} />
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={StyleSheet.compose({ flex: 1, padding: 10, paddingHorizontal: 20 }, styles.parent)}>
      <View style={StyleSheet.compose({ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }, styles.parent)}>
        <Ionicons name="menu-outline" size={30} color={Colors.dark.text} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: Colors.dark.text, fontSize: 30, fontWeight: 'bold', color: 'orange' }}>M</Text>
          <Text style={{ color: Colors.dark.text, fontSize: 30, fontWeight: 'bold' }}>ovies</Text>
        </View>
        <Ionicons name="search-outline" size={30} color={Colors.dark.text} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCategory('Trending', false, data.trending)}
        {renderCategory('Upcoming', true, data.upcoming)}
        {renderCategory('Popular', true, data.popular)}
        {renderCategory('Top Rated', true, data.topRated)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text,
  },
  showAll: {
    color: 'orange',
  },
  listDescriptionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  parentShowAll: {
    paddingVertical: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContainer: {
    paddingHorizontal: 10,
  },
});
