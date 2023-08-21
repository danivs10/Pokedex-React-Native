import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from './Home'
import PokemonDetailsScreen from './PokemonDetailsScreen'

import { View, Text, TouchableOpacity } from 'react-native';

// ... Your other imports and components ...

const Stack = createStackNavigator();

export default function App() {



  // ... Your existing code ...

  return (
    <NavigationContainer>
      <Stack.Navigator 
  screenOptions={{
    headerShown: false
  }} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Details"
          component={PokemonDetailsScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, // Bottom to top transition
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
