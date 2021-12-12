import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';

const Profile = () => {
   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const isFocused = useIsFocused();

   const [currentUser, setcurrentUser] = useState({})
   useEffect(() => {
      console.log('Getting current user object from async storage');
      // console.log(getStoredUserObject())
      getStoredUserObject().then(res => setcurrentUser(res))
   }, [isFocused])

   return (
      <View>
         <Text>{currentUser?.id}</Text>
         <Text>{currentUser?.firstName}</Text>
      </View>
   )
}

export default Profile
