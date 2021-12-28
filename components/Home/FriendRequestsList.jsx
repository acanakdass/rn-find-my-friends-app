import { Avatar, FlatList } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import { ListItem, Button, Icon, Text } from 'react-native-elements'
import FriendsService from '../../services/FriendsService';
import AvatarCircle from '../Utils/AvatarCircle';

const FriendRequestsList = ({ data, acceptFriendRequest }) => {

   const keyExtractor = (item, index) => index.toString()




   const renderItem = ({ item }) => (
      <ListItem
         onPress={() => console.log('pressed')}
         containerStyle={{ backgroundColor: "black" }}>
         {/* <Icon color='white' name="person" /> */}
         <AvatarCircle size={50} imagePath={item.imagePath} />
         <ListItem.Content >
            <ListItem.Title ><Text style={{ color: 'white' }}>{item?.firstName}</Text> </ListItem.Title>
            <ListItem.Subtitle><Text style={{ color: 'white' }}>{item?.email} </Text></ListItem.Subtitle>

         </ListItem.Content>

         <Button onPress={() => acceptFriendRequest(item.id)} type='outline' buttonStyle={{ borderColor: 'lightblue', borderWidth: '2', borderRadius: '25' }}
            icon={{
               name: "check",
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
            keyExtractor={keyExtractor}
            data={data}
            renderItem={renderItem}
         />
      </View>
   )
}

export default FriendRequestsList
