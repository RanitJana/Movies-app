import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../constants/Colors.js';

import { getPopular, getTopRated, getTrending, getUpcoming } from '../api/movieApi.js';
import ShowComponent from '../hooks/loading.hooks.jsx';

export default function Index() {

  const [fetchingTrendingData, setFetchingTrendingData] = useState(true);
  const [fetchingUpcomingData, setFetchingUpcomingData] = useState(true);
  const [fetchingPopularData, setFetchingPopularData] = useState(true);
  const [fetchingTopRatedData, setFetchingTopRatedData] = useState(true);

  function margeStyle(obj1, obj2) {
    return Object.assign({}, obj1, obj2);
  }

  const [trending, setTrending] = useState(Array(0));
  const [upcoming, setUpcoming] = useState(Array(0));
  const [popular, setPopular] = useState(Array(0));
  const [topRated, setTopRated] = useState(Array(0));

  useMemo(() => {
    (
      async () => {
        setFetchingTrendingData(true);
        setFetchingUpcomingData(true);
        setFetchingPopularData(true)
        setFetchingTopRatedData(true);

        let ans = await getTrending();
        setTrending(ans);
        setFetchingTrendingData(false);

        ans = await getUpcoming();
        setUpcoming(ans);
        setFetchingUpcomingData(false);

        ans = await getPopular();
        setPopular(ans);
        setFetchingPopularData(false);

        ans = await getTopRated();
        setTopRated(ans);
        setFetchingTopRatedData(false);

      }
    )()

  }, [])

  return (
    <SafeAreaView style={margeStyle({ flex: 1, padding: 10, paddingHorizontal: 20 }, styles.parent)}>
      <View style={margeStyle({ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10 }, styles.parent)}>
        <Ionicons name="menu-outline" size={30} color={Colors.dark.text} />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: Colors.dark.text, fontSize: 30, fontWeight: 'bold', color: 'orange' }}>M</Text>
          <Text style={{ color: Colors.dark.text, fontSize: 30, fontWeight: 'bold' }}>ovies</Text>
        </View>
        <Ionicons name="search-outline" size={30} color={Colors.dark.text} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/*tranding*/}
        <View>
          <View style={styles.parentShowAll}>
            <Text style={styles.listDescriptionText}>Trending</Text>
            <Text style={styles.showAll}>show all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
            <ShowComponent info={[fetchingTrendingData, trending]} />
          </ScrollView>
        </View>

        {/*upcoming*/}

        <View>
          <View style={styles.parentShowAll}>
            <Text style={styles.listDescriptionText}>Upcoming</Text>
            <Text style={styles.showAll}>show all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
            <ShowComponent info={[fetchingUpcomingData, upcoming]} />
          </ScrollView>
        </View>

        {/* popular */}

        <View>
          <View style={styles.parentShowAll}>
            <Text style={styles.listDescriptionText}>Popular</Text>
            <Text style={styles.showAll}>show all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
            <ShowComponent info={[fetchingPopularData, popular]} />
          </ScrollView>
        </View>

        {/* top rated */}

        <View>
          <View style={styles.parentShowAll}>
            <Text style={styles.listDescriptionText}>Top Rated</Text>
            <Text style={styles.showAll}>show all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardContainer}>
            <ShowComponent info={[fetchingTopRatedData, topRated]} />
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    backgroundColor: Colors.dark.background,
    color: Colors.dark.text
  },
  showAll: {
    color: 'orange'
  },
  listDescriptionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900'

  },
  parentShowAll: {
    paddingVertical: 10,
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
