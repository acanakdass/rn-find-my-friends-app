import { Button, Divider } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper';
import { AuthContext } from '../../contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import FriendsService from '../../services/FriendsService';

const Friends = ({ navigation }) => {

   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const [currentUser, setcurrentUser] = useState({});
   const isFocused = useIsFocused();
   const [friends, setFriends] = useState([]);

   let friendsService = new FriendsService();
   useEffect(async () => {
      console.log('Getting current user object from async storage');
      // console.log(getStoredUserObject())
      await getStoredUserObject().then(res => {
         setcurrentUser(res);
      })
   }, [])

   useEffect(() => {
      if (currentUser != {}) {
         friendsService.getAllFriendsByUserId(currentUser.id).then(res => {
            // console.log(res.data.data)
            setFriends(res.data.data)
         })
      }
      console.log('setting friends')
   }, [currentUser])

   return (

      <View>
         <Text>friends screen</Text>
         <Button onPress={() => navigation.navigate('FriendRequests')} >See friend requests</Button>
         <Divider />
         {friends.map((friend) => (
            <List.Item key={friend.id}
               title={friend.email}
               description={friend.firstName}
               left={props => <List.Icon {...props} icon="folder" />}
            />
         ))}
      </View>
   )
}

export default Friends

const styles = StyleSheet.create({})
