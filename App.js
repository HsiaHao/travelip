import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screen/Home';
import Map from './Screen/Map';
import KeyboardAvoidingView from './Screen/KeyboardAvoidingView'
import Mountain_list from './Screen/Mountain_list';
import Map_FindMountain from './Screen/Map_FindMountain';
import { Provider } from 'react-redux';
import { Store } from './Redux/store';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator(); 



function App() {
  
  let [fontsLoaded] = useFonts({
    'ImprimaRegular': require('./assets/fonts/Imprima-Regular.ttf'),
    'IMFellGreatPrimerItalic': require('./assets/fonts/IMFellGreatPrimer-Italic.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  

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
          <Stack.Screen
            name="Map_FindMountain"
            component={Map_FindMountain}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}



export default App;