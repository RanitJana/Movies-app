import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const People = ({ people }) => {
  let person = people.person;

  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push(`/person/${person?.id}`)}
      style={{ marginHorizontal: 10 }}
    >
      {person?.profile_path ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${person?.profile_path}`,
          }}
          style={styles.image}
        />
      ) : (
        <View
          style={[
            styles.image,
            {
              alignItems: 'center',
              backgroundColor: 'white',
              overflow: 'hidden',
            },
          ]}
        >
          <FontAwesome name="user" size={75} color="#ccc" />
        </View>
      )}
      <Text
        numberOfLines={1}
        style={{
          color: 'white',
          maxWidth: 70,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {person?.original_name}
      </Text>
      <Text
        numberOfLines={1}
        style={{ color: 'white', maxWidth: 70, textAlign: 'center' }}
      >
        {person?.character}
      </Text>
    </Pressable>
  );
};

export default People;

const styles = StyleSheet.create({
  image: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 50,
    marginBottom: 10,
  },
});
