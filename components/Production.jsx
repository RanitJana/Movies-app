import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Production = ({ company }) => {
  let productionCompany = company.company;

  return (
    <View style={{ marginHorizontal: 10 }}>
      {productionCompany?.logo_path ? (
        <View style={styles.imageParent}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${productionCompany?.logo_path}`,
            }}
            style={styles.image}
          />
        </View>
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
          <View style={styles.imageParent}>
            <FontAwesome
              name="building-o"
              size={40}
              color="#ccc"
              style={{ objectFit: 'contain' }}
            />
          </View>
        </View>
      )}
      <Text
        numberOfLines={1}
        style={{
          color: 'white',
          maxWidth: 70,
          textAlign: 'center',
          fontWeight: 'bold',
          marginTop: 10,
        }}
      >
        {productionCompany?.name}
      </Text>
      <Text style={{ color: 'white', maxWidth: 70, textAlign: 'center' }}>
        {productionCompany?.origin_country}
      </Text>
    </View>
  );
};

export default Production;

const styles = StyleSheet.create({
  image: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 5,
    objectFit: 'contain',
  },
  imageParent: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    aspectRatio: 1,
    padding: 10,
  },
});
