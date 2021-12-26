import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions, Image } from 'react-native'
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { AuthContext } from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Text } from 'react-native-elements';

import MapView, { Marker } from 'react-native-maps';
import LocationService from '../../services/LocationService';
import FriendsService from '../../services/FriendsService';
import SingleSpinner from '../Utils/SingleSpinner';


const Main = () => {

   const [token, settoken] = useState(null)
   const [friends, setFriends] = useState(null)
   const [currentUser, setcurrentUser] = useState({})
   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject, getLocation } = React.useContext(AuthContext)
   const isFocused = useIsFocused();
   const userService = new UserService();
   const locationService = new LocationService();
   const friendService = new FriendsService();


   const image = "https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"


   const getUser = () => {
      // console.log('aaaaaaaa:' + token)
      userService.getCurrentUser(token).then(res => {
         // console.log(res.data)
         setcurrentUser(res.data.data)
      }).catch(err => console.log("err : " + err))
   }

   useEffect(() => {
      if (currentUser != {}) {
         setCurrentUserToAsyncStorage()
         friendService.getAllFriendsByUserId(currentUser.id).then(res => {
            // console.warn(res.data.data)
            setFriends(res.data.data)
         })
      }

   }, [currentUser, isFocused])
   useEffect(() => {
      if (currentUser.id != undefined) {
         getLocation().then(res => {
            console.log('getting location')
            console.log(res)

            locationService.setLocation(res.latitude.toString(), res.longitude.toString(), currentUser.id).then(res => {
               console.log('set location res: ')
               console.log(res.data.message)
            });
         })
      }

   }, [currentUser])

   const setCurrentUserToAsyncStorage = async () => {
      try {
         console.log(currentUser)
         const jsonValue = JSON.stringify(currentUser)
         await AsyncStorage.setItem('currentUserObj', jsonValue)
         console.log('Storing current user suceeded')
         console.log(jsonValue)
      } catch (e) {
         // saving error
         console.log('Store error : ' + e)
      }
   }
   useEffect(() => {
      getStoredToken().then(res => settoken(res));
      setTimeout(() => {
         getUser();
      }, 1000)

   }, [token])
   return (
      <View style={styles.container}>

         {/* <Text h3 h3Style={{ color: 'white' }} >signed in user : {currentUser.firstName} </Text> */}
         {friends == null ? (
            <View style={{ marginBottom: 100 }}>
               <SingleSpinner />
            </View>
         ) : (


            <MapView initialRegion={{
               latitude: 37.77984073665778,
               longitude: 30.534712797822603,
               latitudeDelta: 0.01,
               longitudeDelta: 0.05,
            }} style={styles.map}>
               {friends?.map(friend => (
                  <Marker
                     title={friend.email}
                     coordinate={
                        {
                           latitude: friend.location?.latitude,
                           longitude: friend.location?.longitude,
                           latitudeDelta: 0.01,
                           longitudeDelta: 0.05,
                        }
                     }>
                     <Image source={{ uri: image }} style={{ width: 26, height: 26 }} />
                  </Marker>
               )
               )}
            </MapView>
         )}

      </View>
   )
}

export default Main

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', flex: 1 },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },
})
