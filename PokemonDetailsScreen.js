import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, PanResponder, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import BasicInfo from './BasicInfo';

import Ionicons from '@expo/vector-icons/Ionicons';
import StatsDisplay from './StatsDisplay';
import EvolutionChain from './EvolutionChain';


async function getPokemonData(id) {

  let pokemons = [];

  let urlData = `https://pokeapi.co/api/v2/pokemon/${id}`;
  let urlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  let responseData = await fetch(urlData);
  let responseSpecies = await fetch(urlSpecies);
  let dataAsJson = await responseData.json();
  let speciesAsJson = await responseSpecies.json();

  const responseEvolutions = await fetch(speciesAsJson?.evolution_chain?.url);
  const evolutions = await responseEvolutions.json();
  //console.log(JSON.stringify(dataAsJson.stats))

  return [dataAsJson, speciesAsJson, evolutions];
}


const PokemonDetailsScreen = ({ route, closeModal }) => {



  const navigation = useNavigation();
  const { id, name, types } = route.params;
  const longId = String(id).padStart(4, '0');

  const formattedName = name.replace('-', ' ');

  const formattedNameArray = formattedName.split(' ');



  const [data, setData] = useState({});
  const [species, setSpecies] = useState({});
  const [evolutions, setEvolutions] = useState({});



  useEffect (() => {
    getPokemonData(id).then((response) => {
      setData(response[0]);
      setSpecies(response[1]);
      setEvolutions(response[2]?.chain);
    })

  }, [])


  //console.log(evolutions)




  const typeColors = {
    'normal': '#BCBCAC',
    'fighting': '#BC5442',
    'flying': '#669AFF',
    'poison': '#AB549A',
    'ground': '#DEBC54',
    'rock': '#BCAC66',
    'bug': '#ABBC1C',
    'ghost': '#6666BC',
    'steel': '#ABACBC',
    'fire': '#FF421C',
    'water': '#2F9AFF',
    'grass': '#78CD54',
    'electric': '#FFCD30',
    'psychic': '#FF549A',
    'ice': '#78DEFF',
    'dragon': '#7866EF',
    'dark': '#785442',
    'fairy': '#FFACFF',
    'shadow': '#0E2E4C'
  };




  
  const typeElements = useMemo(() =>
    types?.map((type, index) => (
      <View
        key={index}
        style={{
          backgroundColor: typeColors[type],
          borderRadius: 10,
          paddingHorizontal: 6,
          paddingVertical: 2,
          margin: 2,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 50,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {type}
        </Text>
      </View>
    ))
  );



  const description = species?.flavor_text_entries?.find(entry => entry.language.name === 'en').flavor_text.replaceAll('\n', ' ');
  const category = species?.genera?.find(entry => entry.language.name === 'en').genus.replace('Pokémon', '');
  const abilities = data?.abilities?.map(entry => entry.ability.name);

  return (
    <>
    <View style={styles.container}>

      <ImageBackground source={require('./assets/Background.png')} style={styles.image} imageStyle={{ borderRadius: 10}}>
      <TouchableOpacity
        style={{ right: 10, top: 10, position: 'absolute' }}
        onPress={() => closeModal()}
      >

      <Ionicons name="md-close-circle" size={32} color="white" />
      </TouchableOpacity>
      
      <View style={styles.nameContainer}>
        <Text
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              minimumFontScale={0.4}
              style={styles.name}
            >
              {formattedName.toUpperCase()}
          </Text>
          
        <Text style={styles.identifier}>Nº {longId}</Text>
        <View style={styles.typesContainer}>
          {typeElements}
        </View>
      </View>

        </ImageBackground>
    </View>
      
      <View style={{ width: '100%', alignItems: 'center' }}>

        <View 
          style={styles.scrollable}
          showsVerticalScrollIndicator={false}>
          
        <View style={{width: '100%', height:320}}>
        <Swiper style={styles.wrapper} showsButtons={false} loop={false} >
          <BasicInfo 
                  description={description}
                  category={category}
                  abilities={abilities}
                  data={data}
                  ></BasicInfo>
          <StatsDisplay stats={data?.stats}></StatsDisplay>
          <EvolutionChain evolutionChain={evolutions} />

        </Swiper>
        </View>
        </View>
      </View>

      <Image
            source={{
              uri: `${data?.sprites?.other?.['official-artwork']?.front_default}`,
            }}
            style={{
              width: 250, // Adjust the size of the image as needed
              height: 250, // Adjust the size of the image as needed
              resizeMode: 'contain',
              marginTop: 180,
              marginLeft: 90,
              position: 'absolute',
              zIndex: 100
            }}
        />
    </>
  );
};

export default PokemonDetailsScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '15%',
    backgroundColor: '#e8f1ff',
    elevation: 5, // For Android shadow
    borderRadius: 10,
    height: '65%',
    position: 'absolute',
    width: '70%',
  },

  image: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    height: '100%',
    width: '100%',
    objectFit: 'cover'
  },
  identifier: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    maxWidth: '60%',
  },
  nameContainer: {
    width: '100%',
    position: 'absolute',
    left: 20,
    top: 10,
  },
  name: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    zIndex: 10,
    maxWidth: '75%',
    flexWrap: 'wrap',
    
  },
  
  scrollable: {
    position: 'absolute',
    zIndex: 1,
    top: 400,
    left: 0,
    backgroundColor: '#e8f1ff',
    width: '90%',
    height: 300,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    margin: '5%',
    marginTop: 0,
  },

  typesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  wrapper: {}
});