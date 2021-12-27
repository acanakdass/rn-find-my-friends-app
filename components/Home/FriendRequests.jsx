import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HStack, Heading, Spinner, Center, Divider, Box, useToast } from 'native-base';
import FriendRequestsList from './FriendRequestsList';
import { AuthContext } from '../../contexts/AuthContext';
import FriendsService from '../../services/FriendsService';
import { useIsFocused } from '@react-navigation/native';
import SingleSpinner from '../Utils/SingleSpinner';

const FriendRequests = () => {

   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const toast = useToast();

   const [currentUser, setcurrentUser] = useState({});
   const [friendRequests, setFriendRequests] = useState();

   const isFocused = useIsFocused()
   let friendsService = new FriendsService();
   // useEffect(async () => {
   //    await getStoredUserObject().then(res => {
   //       setcurrentUser(res);
   //    })
   // }, [])
   useEffect(async () => {
      if (currentUser.id == undefined) {
         await getStoredUserObject().then(res => {
            console.log(res)
            console.log(currentUser)
            console.log('res')
            setcurrentUser(res);
         })
      }
   }, [isFocused, currentUser])

   const acceptFriendRequest = (senderId) => {
      friendsService.acceptFriendRequest(senderId, currentUser.id).then(res => {
         console.log(res.data.message);
         toast.show({
            title: res.data.message,
            placement: 'top',
            status: 'success'
         })
         setFriendRequests(friendRequests.filter(f => f.id != senderId));
      }).catch(err => console.log('err while accepting:' + err))
   }
   useEffect(() => {
      if (true) {
         friendsService.getAllFriendRequestsByUserId(currentUser.id).then(res => {
            console.log(res.data.data)
            console.log("res.data.data")
            setFriendRequests(res.data.data)
         })
      }
      console.log('setting friend requests')
   }, [currentUser, isFocused])





   return (
      <View style={styles.container}>

         {
            friendRequests == null
               ? (
                  <Center marginTop={50} >
                     <Text style={{ color: 'white' }}>No friend requests</Text>
                  </Center>
               ) : friendRequests.length === 0
                  ? (
                     <Center marginTop={50} >
                        <Text style={{ color: 'white' }}>No friend requests</Text>
                     </Center>
                  )
                  : (
                     <FriendRequestsList acceptFriendRequest={acceptFriendRequest} data={friendRequests} />
                  )
         }
      </View>
   )
}

export default FriendRequests

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', flex: 1 }
})