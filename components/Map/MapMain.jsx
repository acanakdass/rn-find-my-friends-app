import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

import { useEffect } from 'react';
import SingleSpinner from '../Utils/SingleSpinner';
import UserService from '../../services/UserService';

export default function App({ route }) {

   const [currentLocation, setCurrentLocation] = React.useState(null)
   const { getLocation } = React.useContext(AuthContext)

   const { latitude, longitude } = route.params;



   const image = "https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"

   return (
      <View style={styles.container}>
         {/* {currentLocation == null ? (
            <View style={{ marginBottom: 100 }}>
               <SingleSpinner />
            </View>
         ) : (

            
         )} */}
         <MapView initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.05,
         }} style={styles.map}>
            <Marker
               title='Me'
               coordinate={
                  {
                     latitude: latitude,
                     longitude: longitude,
                     latitudeDelta: 0.01,
                     longitudeDelta: 0.05,
                  }
               }>
               <Image source={{ uri: image }} style={{ width: 26, height: 26 }} />
            </Marker>
         </MapView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },
});