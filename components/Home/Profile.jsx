import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { Button, Divider } from 'native-base';
import { Avatar, Card, IconButton } from 'react-native-paper';
import AvatarCircle from '../Utils/AvatarCircle';

const Profile = () => {
   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const isFocused = useIsFocused();

   const [currentUser, setcurrentUser] = useState({})
   useEffect(() => {
      // console.log('Getting current user object from async storage');
      // console.log(getStoredUserObject())
      getStoredUserObject().then(res => setcurrentUser(res))
   }, [isFocused])

   return (
      <View style={styles.container}>
         <Card.Title

            title={currentUser.firstName + " " + currentUser.lastName}
            subtitle={currentUser.email}
            left={(props) => <AvatarCircle size={50} imagePath={currentUser.imagePath} />}
            right={(props) => <IconButton {...props} icon="menu" onPress={() => { }} />}
         />
         <Button onPress={() => {
            signOut()
         }}>Sign Out</Button>
      </View>
   )
}

export default Profile
const styles = StyleSheet.create({
   container: { backgroundColor: 'black', flex: 1 },
   text: {
      color: 'white'
   }
})
