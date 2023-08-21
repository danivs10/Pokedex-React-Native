import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EvolutionCard = ({ name, imageUrl, level, firstInChain }) => {
  return (
    <View style={styles.fullCardContainer}>
      {!firstInChain && level && <Text style={styles.evolutionLvlText}>Lvl. {level}</Text>}
      <View style={styles.cardContent}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.pokemonImage}
        />
        <Text style={styles.pokemonName}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 5,
    marginLeft: 5,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  evolutionLvlText: {
    fontSize: 10,
    backgroundColor: '#afb7c4',
    borderRadius: 10,
    padding: 5,
  },
  pokemonImage: {
    width: 60,
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  pokemonName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default EvolutionCard;
