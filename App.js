import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screen/Home';
import Map from './Screen/Map';
import Mountain_list from './Screen/Mountain_list';
import { Provider } from 'react-redux';
import { Store } from './Redux/store';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();



function App() {
  const [loaded] = useFonts({
    ImprimaRegular: require('./assets/fonts/Imprima-Regular.ttf'),
    IMFellGreatPrimerItalic: require('./assets/fonts/IMFellGreatPrimer-Italic.ttf'),
  });

  return (
     <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
          <Stack.Screen
            name="Mountain_list"
            component={Mountain_list}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}



export default App;