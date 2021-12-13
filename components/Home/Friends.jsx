import { Button, Divider, Spinner } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import FriendsService from '../../services/FriendsService';
import SingleSpinner from '../Utils/SingleSpinner';
import FriendsList from './FriendsList';

const Friends = ({ navigation }) => {

   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const isFocused = useIsFocused();
   const [currentUser, setcurrentUser] = useState({});
   const [friends, setFriends] = useState(null);

   let friendsService = new FriendsService();
   useEffect(async () => {
      console.log('Getting current user object from async storage');
      // console.log(getStoredUserObject())
      await getStoredUserObject().then(res => {
         setcurrentUser(res);
      })
      console.log('friendsss: ' + friends)
   }, [])

   useEffect(() => {
      if (currentUser != {}) {
         friendsService.getAllFriendsByUserId(currentUser.id).then(res => {
            // console.log(res.data.data)
            setFriends(res.data.data)
         })
      }
      console.log('setting friends')
   }, [currentUser, isFocused])

   return (

      <View>
         {/* <Text>friends screen</Text>
         <Button onPress={() => navigation.navigate('FriendRequests')} >See friend requests</Button> */}
         <Divider />
         {friends == null ? (
            <SingleSpinner />
         ) : <View>
            <FriendsList data={friends} />
         </View>}

      </View>
   )
}

export default Friends

const styles = StyleSheet.create({})
