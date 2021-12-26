import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import AuthStackScreen from './AuthStackScreen';
import HomeStackNavigator from './HomeStackNavigator';
import UserService from '../services/UserService';
import { useNavigation } from '@react-navigation/core';
import MapMain from '../components/Map/MapMain';

const RootStackNavigator = ({ isAuthenticated }) => {

   // const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [token, setToken] = useState(null)

   const navigation = useNavigation();


   // useEffect(() => {
   //    let getToken = AsyncStorage.getItem('token');
   //    getToken.then((value) => {
   //       setToken(value);
   //       console.log(value)
   //    }).catch(err => {
   //       setToken(null)
   //    })

   //    let userService = new UserService();

   //    userService.getCurrentUser(token).then(res => {
   //       setIsAuthenticated(true)
   //       console.log(res.data)
   //       navigation.navigate("Home")
   //    }).catch(err => {
   //       console.log(token)
   //       console.log("Error while getting current user: " + err);
   //       navigation.navigate("Signin")
   //       // setIsAuthenticated(false)
   //    })
   //    console.log(isAuthenticated)
   // }, [])


   const Stack = createNativeStackNavigator();

   return (
      <Stack.Navigator>

         {isAuthenticated == true ? (
            <>
               <Stack.Screen name="Home" component={HomeStackNavigator} options={{ animation: 'fade_from_bottom', title: 'Find My Friends', headerShown: true, headerTitleStyle: { color: 'white' }, headerStyle: { backgroundColor: 'black' } }} />
               <Stack.Screen name="Map" component={MapMain} options={{ animation: 'fade', title: 'Map', headerShown: true, headerTitleStyle: { color: 'white' }, headerStyle: { backgroundColor: 'black' } }} />
            </>
         ) :
            <>
               <Stack.Screen name="Auth" component={AuthStackScreen} options={{ animation: 'none', title: 'Sign In', headerShown: false }} />
               {/* <Stack.Screen name="Home" component={HomeStackNavigator} options={{ title: 'Find My Friends', headerShown: true }} /> */}
            </>
         }
      </Stack.Navigator>
   )
}

export default RootStackNavigator

const styles = StyleSheet.create({})
