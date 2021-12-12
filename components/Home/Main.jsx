import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { AuthContext } from '../../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
const Main = () => {

   const [token, settoken] = useState(null)
   const [currentUser, setcurrentUser] = useState({})
   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const isFocused = useIsFocused();

   const getUser = () => {
      let userService = new UserService();
      // console.log('aaaaaaaa:' + token)
      userService.getCurrentUser(token).then(res => {
         // console.log(res.data)
         setcurrentUser(res.data.data)
      }).catch(err => console.log("err : " + err))
   }

   useEffect(() => {
      if (currentUser != {}) {
         setCurrentUserToAsyncStorage()
      }
      console.log('aaa')
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
      <View>
         <Text>MainPAge</Text>
         <Text>signed in user : {currentUser.firstName} </Text>
         <Button onPress={() => {
            signOut()
         }}>Sign Out</Button>
      </View>
   )
}

export default Main

const styles = StyleSheet.create({})
