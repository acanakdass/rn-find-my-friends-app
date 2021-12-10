import { Button } from 'native-base'
import React, { useEffect, useState } from 'react'
import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { AuthContext } from '../../contexts/AuthContext';

const Main = () => {

   const [token, settoken] = useState(null)
   const [currentUser, setcurrentUser] = useState({})
   const { signIn, signOut, goWithoutSignIn, getStoredToken } = React.useContext(AuthContext)

   const getUser = () => {



      let userService = new UserService();
      console.log('aaaaaaaa:' + token)
      userService.getCurrentUser(token).then(res => {
         setcurrentUser(res.data.data)
         console.log(res.data)
         setcurrentUser(res.data.data)
      }).catch(err => console.log("err : " + err))
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
         <Button onPress={() => getUser()}>getuser</Button>
      </View>
   )
}

export default Main

const styles = StyleSheet.create({})
