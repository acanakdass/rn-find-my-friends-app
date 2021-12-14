import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HStack, Heading, Spinner, Center, Divider } from 'native-base';
import FriendRequestsList from './FriendRequestsList';
import { AuthContext } from '../../contexts/AuthContext';
import FriendsService from '../../services/FriendsService';
import { useIsFocused } from '@react-navigation/native';

const FriendRequests = () => {

   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)

   const [currentUser, setcurrentUser] = useState({});
   const [friendRequests, setFriendRequests] = useState(null);

   const isFocused = useIsFocused()
   let friendsService = new FriendsService();
   useEffect(async () => {
      console.log('Getting current user object from async storage');
      // console.log(getStoredUserObject())
      await getStoredUserObject().then(res => {
         setcurrentUser(res);
      })
   }, [])

   const acceptFriendRequest = (senderId) => {
      friendsService.acceptFriendRequest(senderId, currentUser.id).then(res => {
         console.log(res.data)
      }).catch(err => console.log('err while accepting:' + err))
      console.log(senderId)
      console.log(currentUser.id)
   }
   useEffect(() => {
      if (currentUser != {}) {
         friendsService.getAllFriendRequestsByUserId(currentUser.id).then(res => {

            setFriendRequests(res.data.data)
         })
      }
      console.log('setting friend requests')
   }, [currentUser, isFocused])





   return (
      <View style={styles.container}>
         <FriendRequestsList acceptFriendRequest={acceptFriendRequest} data={friendRequests} />
      </View>
   )
}

export default FriendRequests

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', flex: 1 }
})