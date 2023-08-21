import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import EvolutionCard from './EvolutionCard'; // Import the EvolutionCard component

const EvolutionChain = ({ evolutionChain }) => {
  const processEvolutionChain = chain => {
    const processedEvolutions = [];

    const processEvolution = (evolution) => {
      const species = evolution.species;
      const id = species?.url?.split('/').slice(-2)[0];

      let imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + id + '.gif';

      if (id >= 650) {
        imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id + '.png';
      }

      const processedEvolution = {
        name: species?.name,
        imageUrl: imgUrl,
        minLevel: evolution?.evolution_details?.[0]?.min_level,
      };

      processedEvolutions.push(processedEvolution);

      if (evolution.evolves_to && evolution.evolves_to.length > 0) {
        evolution.evolves_to.forEach(nextEvolution => {
          processEvolution(nextEvolution);
        });
      }
    };

    processEvolution(chain);

    return processedEvolutions;
  };

  //console.log(JSON.stringify(evolutionChain))
  const processedEvolutions = processEvolutionChain(evolutionChain);

  return (
    <View style={styles.container}>
    <Text style={{ margin: 20,
    fontSize: 18,
    fontWeight: 'bold' }}>Description</Text>
    <ScrollView contentContainerStyle={styles.evolutionContainer}>
      {processedEvolutions.map((evolution, index) => (
        <EvolutionCard
          key={index}
          name={evolution.name}
          imageUrl={evolution.imageUrl}
          level={evolution.minLevel}
        />
      ))}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
  },
  evolutionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: '15%'
  },
});

export default EvolutionChain;
