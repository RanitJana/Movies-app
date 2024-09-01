import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { getPersonInfo, getPersonMovies } from '@/api/peopleApi.js';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors.js';
import { getDate } from '@/components/MovieCard.jsx';
import { renderCategory } from '../index.jsx';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

const MovieOne = () => {
  const { id } = useLocalSearchParams();
  const [people, setPeople] = useState(null);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        let ans = await getPersonInfo(id);
        setPeople(ans);

        ans = await getPersonMovies(id);
        setMovies([...ans.cast, ...ans.crew]);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch details');
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: Colors.dark.background, flex: 1 },
        ]}
      >
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.center,
          { backgroundColor: Colors.dark.background, flex: 1 },
        ]}
      >
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.dark.background,
        color: Colors.dark.text,
        flex: 1,
        padding: 10,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.dark.background,
          color: Colors.dark.text,
          flex: 1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Pressable onPress={() => router.replace('/')} style={styles.home}>
            <MaterialCommunityIcons
              name="home-variant"
              size={25}
              color="white"
            />
          </Pressable>
          <View style={styles.profileImgParent}>
            {people?.profile_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${people?.profile_path}`,
                }}
                style={styles.profileImage}
              />
            ) : (
              <FontAwesome
                name="user"
                size={styles.profileImage.width}
                color="#ccc"
              />
            )}
          </View>
          <Text style={styles.title}>{people?.name}</Text>
          <Text style={styles.birthPlace}>
            {people?.place_of_birth || 'Unknown birth place'}
          </Text>
          <View style={styles.basicInfo}>
            <View style={styles.subBasicInfo}>
              <Text style={styles.subBasicInfoHeading}>Gender</Text>
              <Text style={styles.subBasicInfoBody}>
                {(() => {
                  let gender = people?.gender;
                  if (gender == undefined) return null;
                  if (gender == 0) return 'not-specified';
                  if (gender == 1) return 'Female';
                  if (gender == 2) return 'Male';
                  return 'Non-binary';
                })()}
              </Text>
            </View>
            <View style={styles.subBasicInfo}>
              <Text style={styles.subBasicInfoHeading}>Birthday</Text>
              <Text style={styles.subBasicInfoBody}>
                {getDate(people?.birthday) || 'Unknown'}
              </Text>
            </View>
            <View style={styles.subBasicInfo}>
              <Text style={styles.subBasicInfoHeading}>Known for</Text>
              <Text style={styles.subBasicInfoBody}>
                {people?.known_for_department}
              </Text>
            </View>
            <View style={[styles.subBasicInfo, { borderRightWidth: 0 }]}>
              <Text style={styles.subBasicInfoHeading}>Popularity</Text>
              <Text style={styles.subBasicInfoBody}>
                {Number(people?.popularity).toPrecision(2)}%
              </Text>
            </View>
          </View>
          <Text style={styles.bioHeading}>Biography</Text>
          <Text style={styles.bioInfo}>{people?.biography || 'Unknown'}</Text>
          <ScrollView style={{ marginBottom: 20 }}>
            {renderCategory('Movies', false, {
              fetching: loading,
              movies: movies,
            })}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MovieOne;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  profileImage: {
    width: 200,
    aspectRatio: 1,
    borderRadius: 500,
  },
  birthPlace: {
    textAlign: 'center',
    color: 'gray',
  },
  profileImgParent: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
  },
  basicInfo: {
    backgroundColor: '#3b3b3b',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
    paddingVertical: 15,
    marginVertical: 30,
  },
  subBasicInfo: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'white',
  },
  subBasicInfoHeading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  subBasicInfoBody: {
    color: 'white',
  },
  bioHeading: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  bioInfo: {
    color: 'gray',
    marginBottom: 20,
    fontSize: 16,
  },
  home: {
    width: 35,
    aspectRatio: 1,
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgb(255, 111, 0)',
    zIndex: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
