import React from 'react';
import { 
  View,
  StyleSheet,
  Text,
  
  } from 'react-native';

import MapView,{PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export default function Map({ route }){

  const { mnt, lat, lng } = route.params;
  return (
    <View style={styles.body}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              }}>
        <Marker
         coordinate={{ latitude: lat, longitude: lng }}
         title={mnt}
        description={"description"}/>

       </MapView>
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
    fontSize: 20,
    margin: 10,
  },
  map: {
        width: '100%',
        height: '100%',
    }
});