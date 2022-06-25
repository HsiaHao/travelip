import React, { useEffect, useMemo, useState, Component } from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet,  View, Text, Dimensions, Animated, Callout, Image} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getCities } from '../Redux/actions';
import mapStyle from '../utils/MapStyle.json';
import { setSelectedLog } from 'react-native/Libraries/LogBox/Data/LogBoxData';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;



export default function Map_FindMountain() {
  
  const { cities } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
  });

  let mapIndex = 0;
  let MapAnimation = new Animated.Value(0);
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  useEffect(() => {
    MapAnimation.addListener(({ value }) => {
      console.log('value',value);
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      console.log('city length',cities.length, index)
      if (index >= cities.length) {
        index = cities.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          _map.current.animateToRegion(
            {
              latitude: cities[index].lat,
              longitude: cities[index].lng,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            },
            350
          );
        }
      }, 10);
    });
  });

  
 
  const interpolations = cities.map((item, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];
    const scale = MapAnimation.interpolate({
      inputRange,
      outputRange: [1, 2.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });



  return (
    <View style={styles.container}>

        {/* <FlatList
        data={cities}
        renderItem={({item}) => <Text>{item.Mountain}</Text>}
        /> */}
  
      <MapView 
        ref={_map}
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        initialRegion={{
        latitude: 22.9756,
        longitude: 120.9738,
        latitudeDelta: 3.5,
        longitudeDelta: 3.8,}}
            >

        {cities.map ((item,index) => {

          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };

          const onMarkerPress = (mapEventData) => {
            const markerID = mapEventData._targetInst.return.key;

            console.log('markerID',markerID);
        
            let x = (markerID * CARD_WIDTH) + (markerID * 20); 

            console.log('x', x);
        
            _scrollView.current.scrollTo({x: x, y: 0, animated: true});
          }

          
          return (<MapView.Marker
             
              key={index}
              coordinate={{ latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }}
              onPress={(e)=>onMarkerPress(e)}
              
              >
            <Animated.View style={[styles.markerWrap]}>
                <Animated.Image 
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
            </Animated.View>
            
            </MapView.Marker>
             );
        })}
              
      </MapView>   

      <Animated.ScrollView
          ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: MapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {cities.map((item, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={require('../assets/mountain.png')}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{item.Mountain}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {item.City}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

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
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
  },
  name : {
    fontSize: 16,
    marginBottom:5,
  },
  bubble:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    padding : 15,
    width: 150,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
 
  },
  marker: {
    width: 16,
    height: 16,
    // borderRadius: 4,
    // backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});