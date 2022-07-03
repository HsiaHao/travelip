import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Fetch } from 'react-request';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export const List = () => {
  // add navigation prop of the screen Restaurants
  const navigation = useNavigation();

  // define state variable to store favorite items
  const [favoriteList, setFavoriteList] = React.useState([]);

  // function to add an item to favorite list
  const onFavorite = restaurant => {
    setFavoriteList([...favoriteList, restaurant]);
  };

  // function to remove an item from favorite list
  const onRemoveFavorite = restaurant => {
    const filteredList = favoriteList.filter(
      item => item.id !== restaurant.id
    );
    setFavoriteList(filteredList);
  };

  // function to check if an item exists in the favorite list or not
  const ifExists = restaurant => {
    if (favoriteList.filter(item => item.id === restaurant.id).length > 0) {
      return true;
    }
    return false;
  };

  const renderHeader = () => {
    return (
      <TouchableOpacity
        style={styles.header}
        onPress={() =>
          navigation.navigate('FavoritesListScreen', {
            favoriteList
          })
        }
      >
        <Text style={styles.text}>Go to favorites</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Fetch
      method='GET'
      url={`https://example-data.draftbit.com/restaurants?_limit=10`}
      headers={{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <ActivityIndicator />;
        }

        if (error) {
          return null;
        }

        if (!data) {
          return null;
        }

        return (
          <FlatList
            data={data}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => {
              return (
                <View style={styles.listContainer}>
                  <View>
                    <Image
                      source={{ uri: item['image'] }}
                      style={styles.image}
                      resizeMode='cover'
                    />
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() =>
                        ifExists(item)
                          ? onRemoveFavorite(item)
                          : onFavorite(item)
                      }
                    >
                      <MaterialIcons
                        name={ifExists(item) ? 'favorite' : 'favorite-outline'}
                        size={32}
                        color={'red'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.listContainer}>
                    <View style={styles.row}>
                      <Text
                        style={styles.text}
                        allowFontScaling={true}
                        numberOfLines={1}
                      >
                        {item && item['name']}
                      </Text>
                      <MaterialIcons
                        name='brunch-dining'
                        size={24}
                        color={'#444'}
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          />
        );
      }}
    </Fetch>
  );
};

export const Favorites = () => {
  const route = useRoute();
  const { favoriteList } = route.params;
  return (
    <FlatList
      data={favoriteList}
      renderItem={({ item }) => {
        return (
          <View style={styles.listContainer}>
            <View>
              <Image
                source={{ uri: item['image'] }}
                style={styles.image}
                resizeMode='cover'
              />
            </View>
            <View style={styles.listContainer}>
              <View style={styles.row}>
                <Text
                  style={styles.text}
                  allowFontScaling={true}
                  numberOfLines={1}
                >
                  {item && item['name']}
                </Text>
                <MaterialIcons name='brunch-dining' size={24} color={'#444'} />
              </View>
            </View>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: '#edf2fb'
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    opacity: 0.7
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontColor: '#010101'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  header: {
    alignItems: 'center'
  }
});