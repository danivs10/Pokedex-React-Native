import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatBar = ({ value, colorLabel }) => {
  const barWidth = ((value / 255) * 150); // Assuming max stat value is 255
  return (
    <View style={styles.statBarContainer}>
      <View style={[styles.statColorCircle, { backgroundColor: colorLabel[1] }]}>
        <Text style={styles.statLabel}>{colorLabel[0]}</Text>
      </View>
      <View style={[styles.statBar, { width: barWidth, backgroundColor: colorLabel[1] }]} />

      <View style={styles.backBar}>
        <Text style={styles.statValue}>{value}/255</Text>
      </View>
    </View>
  );
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


const StatsDisplay = ({ stats }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.elevatedContainer}>
        <Text style={styles.title}>Stats</Text>
        {stats?.map(stat => (
          <StatBar
            key={stat.stat.name}
            value={stat.base_stat}
            colorLabel={getColorLabel(stat.stat.name)}
          />
        ))}
      </View>
    </View>
  );
};

const getColorLabel = statName => {
  const colorLabels = {
    'hp': ['HP', '#78CD54'],
    'attack': ['ATK', '#FF421C'],
    'defense': ['DEF', '#2F9AFF'],
    'special-attack': ['SpA', '#AB549A'],
    'special-defense': ['SpD', '#669AFF'],
    'speed': ['SPE', '#78DEFF'],
  };
  return colorLabels[statName];
};


const styles = StyleSheet.create({
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  elevatedContainer: {
    borderRadius: 8,
    padding: 10,
  },
  statBarContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statColorCircle: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 50,
    marginRight: 5
  },
  statLabel: {
    fontSize: 10,
    color: 'white',
  },
  statBar: {
    height: 8,
    justifyContent: 'center',
    borderRadius: 8,
    zIndex: -1
  },
  backBar: {
    flex: 1,
    justifyContent: 'right',
    zIndex: -1,
  },
  statValue: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right',
    right: 0
  },
});

export default StatsDisplay;