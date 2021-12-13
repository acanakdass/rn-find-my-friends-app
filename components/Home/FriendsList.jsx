import { Avatar, FlatList } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'

const FriendsList = ({ data }) => {

   const keyExtractor = (item, index) => index.toString()

   const renderItem = ({ item }) => (
      <ListItem.Swipeable
         leftContent={
            <Button
               title="Info"
               icon={{ name: 'info', color: 'white' }}
               buttonStyle={{ minHeight: '100%' }}
            />
         }
         rightContent={
            <Button
               title="Delete"
               icon={{ name: 'delete', color: 'white' }}
               buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            />
         }
      >
         <Icon name="person" />
         <ListItem.Content>
            <ListItem.Title>{item?.firstName} </ListItem.Title>
            <ListItem.Subtitle>{item?.email} </ListItem.Subtitle>
         </ListItem.Content>


         {/* <ListItem.Chevron /> */}
      </ListItem.Swipeable>
   )
   return (
      <View>

         <FlatList
            keyExtractor={keyExtractor}
            data={data}
            renderItem={renderItem}
         />
      </View>
   )
}

export default FriendsList
