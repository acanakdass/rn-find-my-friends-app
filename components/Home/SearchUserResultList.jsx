import { Avatar, FlatList } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { ListItem, Button, Icon, Text } from 'react-native-elements'
import FriendsService from '../../services/FriendsService';

const SearchUserResultList = ({ data, acceptFriendRequest, currentUserId }) => {

   const keyExtractor = (item, index) => index.toString()

   let friendsService = new FriendsService();
   const handleSendRequest = (receiverId) => {
      friendsService.sendFriendRequest(currentUserId, receiverId).then(res => console.log(res.data.message));
   }

   const renderItem = ({ item }) => (
      <ListItem
         onPress={() => console.log(`currentId:${currentUserId}, thisUserId: ${item.id} `)}
         containerStyle={{ backgroundColor: "black" }}>
         <Icon color='white' name="person" />
         <ListItem.Content >
            <ListItem.Title ><Text style={{ color: 'white' }}>{item?.firstName}</Text> </ListItem.Title>
            <ListItem.Subtitle><Text style={{ color: 'white' }}>{item?.email} </Text></ListItem.Subtitle>

         </ListItem.Content>

         <Button onPress={() => handleSendRequest(item.id)} type='outline' buttonStyle={{ borderColor: 'lightblue', borderWidth: '2', borderRadius: '25' }}
            icon={{
               name: "person-add",
               size: 25,
               color: "white"
            }}
         // title="object"
         />
         {/* <ListItem.Chevron /> */}
      </ListItem>
   )
   return (
      <View style={{ height: '100%' }}>

         <FlatList
            scrollEnabled
            style={{ paddingBottom: 250 }}
            keyExtractor={keyExtractor}
            data={data}
            renderItem={renderItem}
         />
      </View>
   )
}

export default SearchUserResultList
