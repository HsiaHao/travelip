import { StatusBar } from 'expo-status-bar'
import MapView from 'react-native-maps';
import React, { useState } from 'react';
import GlobalStyle from '../utils/GlobalStyle';

import { 
  Button, 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  } from 'react-native'


const Travelip = ({navigation}) => {

  const [name, SetName] = useState('');
  const [submitted, SetSubmitted] = useState(false);
  const onPressHandler = () => {
    SetSubmitted(!submitted);
  }

  return (
    <View style={styles.container}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Please write your name:
      </Text>
      <TextInput 
        style={[GlobalStyle.CustomFont, styles.input]}
        placeholder='e.g. John'
        onChangeText={(value) => SetName(value)}
      />
      <Button 
        title='Submit'
        onPress={onPressHandler}
      />
      {submitted ?
      <Test name={name} />
      :
      null
      }

      {submitted ?
      <Button
        title='visit mountain list'
        onPress={() => navigation.navigate('Mountain_list') }
        
      />
      :
      null
      }
    </View>
  );
}


const Test = (props) => {
  return(
    <View>
      <Text style={[GlobalStyle.CustomFont]} > Welcome to Travelip. You are reistered as {props.name}! </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
  input: {
    width: 200,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});

export default Travelip;