import { Avatar, FlatList } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'

const FriendsList = ({ data }) => {

   const testFunc = () => {

   }
   const keyExtractor = (item, index) => index.toString()

   const renderItem = ({ item }) => (
      <ListItem.Swipeable
         onPress={() => alert(item.email)}
         // accessible
         containerStyle={{ backgroundColor: 'black' }}
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
         style={{ backgroundColor: 'black' }}
      >
         <Icon name="person" color='white' />
         <ListItem.Content >
            <ListItem.Title ><Text style={{ color: 'white' }}>{item?.firstName}</Text> </ListItem.Title>
            <ListItem.Subtitle><Text style={{ color: 'white' }}>{item?.email} </Text></ListItem.Subtitle>
         </ListItem.Content>
         <ListItem.Chevron />
      </ListItem.Swipeable>
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

export default FriendsList
