import React, { useEffect } from 'react';
import GlobalStyle from '../utils/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { getCities } from '../Redux/actions';

import { 
  Alert,
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  } from 'react-native';

export default function Mountain_list({navigation}){


  const { cities } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const openUrl = async (url) => {
    const isSupported = await Linking.canOpenTRL(url);
    if (isSupported) {
      await Linking.openURL(url)
    }
    else {
      Alert.alert('Do not  know how to open this url: ${url}');
    }
  }


  useEffect(() => {
        dispatch(getCities());
    });

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>
        Top 10 lettle Mountain
      </Text>

    <FlatList
      data={cities}
      renderItem={({ item }) => (
        
      <TouchableOpacity
        onPress={() => {
        //   navigation.navigate('Map', {
        //     mnt: item.Mountain,
        //     lat: item.lat,
        //     lng: item.lng,
        // });
        Linking.openURL(`https://www.google.com/maps/search/${item.lat},${item.lng}/`)
      }}
      
      >

      <View style={styles.item}>
          <Text style={[GlobalStyle.CustomFont,styles.title]}>{item.Mountain}</Text>
          <Text style={[GlobalStyle.CustomFont,styles.subtitle]}>{item.City}</Text>
      </View>

      </TouchableOpacity>

      )}
      keyExtractor={(item, index) => index.toString()}
    
    
    />
    </View>
  );
}
const styles = StyleSheet.create({
  body: {
    flex:1,
    alignItems:'center',
  },
  text: {
    color: '#000000',
    fontSize: 30,
    margin: 10,
  },
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width:200,
    justifyContent:'center',
    alignItems: 'center',
  },
  title: {
    fontSize:20,
    margin:10,
  },
  subtitle: {
    fontSize:15,
    margin: 10,
    color: '#999999',
  }

});