import { View, Text } from 'react-native'
import React from 'react'

const BasicInfo = ({ description, category, abilities, data }) => {
  return (
    <View style={styles.allDataContainer}>
    <Text style={{ marginBottom: 10,  marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold' }}>Description</Text>
      <Text style={{ marginBottom: 15}}>{description}</Text>

      <View style={styles.dataRowContainer}>
        <Text style={styles.dataLabel}>Category</Text>
        <Text style={styles.dataLabel}>Habiliity</Text>
      </View>
      <View style={styles.dataRowContainer}>
        <View style={styles.dataContainer}>
          <Text>{category}</Text>
        </View>

        <View style={styles.dataContainer}>
          <Text>{abilities?.[0]}</Text>
        </View>
      </View>
      <View style={styles.dataRowContainer}>
        <Text style={styles.dataLabel}>Height</Text>
        <Text style={styles.dataLabel}>Weight</Text>
        <Text style={styles.dataLabel}>Base EXP</Text>
      </View>
      <View style={styles.dataRowContainer}>
        <View style={styles.dataContainer}>
          <Text>{data.height / 10 + ' '}m</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>{data.weight / 10 + ' '}Kg</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text>{data.base_experience}</Text>
        </View>
      </View>
    </View>
  );
}


const styles = {


  allDataContainer: {
    padding: 40,
    paddingTop: 10,
    gap: 10,
  },
  dataRowContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dataLabel: {
    textAlign: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  dataContainer: {
    backgroundColor: '#afb7c4',
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    padding: 5
  },
};


export default BasicInfo