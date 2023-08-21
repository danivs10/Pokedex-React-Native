import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearIcon, setShowClearIcon] = useState(false);

  const handleInputChange = (query) => {
    setSearchQuery(query);
    setShowClearIcon(true); // Show the clear icon immediately
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowClearIcon(false);
    onSearch('');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search Pokémon"
          value={searchQuery}
          onChangeText={handleInputChange}
        />
        {showClearIcon ? (
          <TouchableOpacity style={styles.clearIcon} onPress={clearSearch}>
            <Ionicons name="md-close-circle" size={25} color="black" />
          </TouchableOpacity>
        ) : (
          <Ionicons style={styles.searchIcon} name="md-search" size={25} color="black" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: '90%', // Occupy the whole width of the screen
    borderWidth: 1,
    position: 'absolute',
    zIndex: 2,
    marginTop: '15%',
    display: 'flex',
    flexDirection: 'row',
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  searchIcon: {
    right: 20,
    top: 12,
    position: 'absolute',
  },
  clearIcon: {
    right: 20,
    top: 12,
    position: 'absolute',
  },
});

export default SearchBar;
