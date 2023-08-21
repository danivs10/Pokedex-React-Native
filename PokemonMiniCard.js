import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native'; // Import Modal
import { useNavigation } from '@react-navigation/native';
import PokemonDetailsScreen from './PokemonDetailsScreen';

const PokemonMiniCard = React.memo(({ id, name, types }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); 
  const longId = String(id).padStart(4, '0');

  useEffect(() => {
    //console.log('rendered pokemnon ' + id);
  }, []);

  const handlePress = () => {
    setModalVisible(true); // Open the modal when the card is pressed
  };

  
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

  const typeElements = useMemo(
    () => types?.map((type, index) => (
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
  )));



  

  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        width: 90,
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
        marginBottom: 70,
        marginHorizontal: '1.5%', 
      }}
      onPress={handlePress} // Navigate to details screen
    >
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center', // Center vertically within the row
            position: 'absolute',
            top: -60,
            left: 1,
          }}
        >
            <Image
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
              }}
              style={{
                width: 90,
                height: 90,
              }}
            />
        </View>
        <Text style={{ 
            fontWeight: 'normal',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 5,
            paddingHorizontal: 5,
            fontSize: 11 
            }}
            >N° {longId}</Text>
        <Text
          style={{
            fontWeight: 900,
            fontSize: 11 
          }}
        >

        {name?.toUpperCase()}
        </Text>
        {typeElements}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        {/* Use PokemonDetailsScreen as the modal content */}
        <PokemonDetailsScreen route={{ params: { id, name, types } }} 
          closeModal={() => setModalVisible(false)} />
      </Modal>
    </TouchableOpacity>
  );
});

export default PokemonMiniCard;
