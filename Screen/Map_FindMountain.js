import React, { useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet,  View, Text, Dimensions, FlatLis} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCities } from '../Redux/actions';


export default function Map_FindMountain() {

  const { cities } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getCities());
  });


  return (
    <View style={styles.container}>

        {/* <FlatList
        data={cities}
        renderItem={({item}) => <Text>{item.Mountain}</Text>}
        /> */}
  
      <MapView style={styles.map} 
        initialRegion={{
            latitude: 23.9756,
            longitude: 120.9738,
            latitudeDelta: 3.5,
            longitudeDelta: 3.8,}}>

        {cities.map ((item,index) => {
          return (<MapView.Marker
             
              image={require('../assets/marker.png')}
              key={index}
              coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }}
              title={item.Mountain}
              description={item.Mountain}
              />);
        })}
        
              

      </MapView>    
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});