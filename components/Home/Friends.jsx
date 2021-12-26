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
   const [friends, setFriends] = useState(null);
   const [currentUser, setcurrentUser] = useState({});

   let friendsService = new FriendsService();
   useEffect(async () => {

      if (currentUser.id == undefined) {
         await getStoredUserObject().then(res => {
            setcurrentUser(res);
         })
      }
   }, [currentUser])

   const handleRemoveFriend = (friendId) => {
      friendsService.removeFromFriends(currentUser.id, friendId).then(res => {
         console.log(res.data?.message);
         setFriends(friends.filter(f => f.id != friendId));
      }).catch(er => {
         console.log(err);
      })
   }
   useEffect(() => {
      if (currentUser.id != undefined) {
         friendsService.getAllFriendsByUserId(currentUser.id).then(res => {

            // console.log("currentUser.id")
            // console.log(currentUser?.id)
            console.log(res.data.data)
            // console.warn(res.data.data)
            setFriends(res.data.data)
         })
      }
      // console.log('setting friends')
   }, [currentUser, isFocused])

   return (

      <View style={styles.container}>
         {/* <Text>friends screen</Text>
         <Button onPress={() => navigation.navigate('FriendRequests')} >See friend requests</Button> */}
         {friends == null ? (
            <SingleSpinner />

         ) : <View>
            <FriendsList handleRemoveFriend={handleRemoveFriend} data={friends} />
         </View>}

      </View>
   )
}

export default Friends

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', flex: 1 }
})