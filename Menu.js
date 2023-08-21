import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Combat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#007bff', // Example color
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Menu;
