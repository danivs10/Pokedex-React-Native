import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Animated, Easing } from 'react-native'; // Import Animated
import { FlatList } from 'react-native';
import PokemonMiniCard from './PokemonMiniCard';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';

  async function getPokemons() {

    let pokemons = [];

    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=897';
    let response = await fetch(url);
    let responseAsJson = await response.json();


    for (let i = 0; i < responseAsJson.results.length; i++) {
      let types = []
      
        pokemons.push({
            id: i + 1,
            name: responseAsJson.results[i].name,
            types: []
        });
    };

    for (let i = 0; i < 18; i++) {
      let url = 'https://pokeapi.co/api/v2/type/' + (i + 1)
      let response = await fetch(url)
      let responseAsJson = await response.json()

      const pokemonInType = responseAsJson.pokemon
      
      for(j = 0; j < pokemonInType.length; j++) {
          const pokemonId = pokemonInType[j].pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '');

          if(pokemonId <= pokemons.length+1 && pokemons[pokemonId]) {
              pokemons[pokemonId-1].types.push(responseAsJson.name);
          };
      };
    };
    return pokemons;
  }


  export default function Home() {
    const navigation = useNavigation();

    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [visiblePokemons, setVisiblePokemons] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const pageSize = 870;

    useEffect(() => {
      getPokemons().then((data) => {
        setPokemons(data);
        setFilteredPokemons(data);
        setVisiblePokemons(data.slice(0, pageSize));
        setStartIndex(pageSize);
      });
    }, []);

    const handleSearch = useCallback(
      (query) => {
        const filtered = pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPokemons(filtered);
        setVisiblePokemons(filtered.slice(0, pageSize));
        setStartIndex(pageSize);
      },
      [pokemons]
    );

    const handleLoadMore = () => {
      if (!isLoadingMore) {
        setIsLoadingMore(true);

        const nextBatch = filteredPokemons.slice(startIndex, startIndex + pageSize);
        setVisiblePokemons((prevVisible) => [...prevVisible, ...nextBatch]);
        setStartIndex(startIndex + pageSize);

        setIsLoadingMore(false);
      }
    };

    const renderItem = ({ item }) => (<PokemonMiniCard 
      id={item.id}
      name={item.name}
      types={item.types}
      ></PokemonMiniCard>);

    return (
      <View style={styles.container}>

        
        <SearchBar onSearch={handleSearch} />



        <FlatList
          data={visiblePokemons}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isLoadingMore && <ActivityIndicator size="small" color="#000000" />}
          numColumns={3}
          
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    cardContainer: {
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 150,
    },
  });