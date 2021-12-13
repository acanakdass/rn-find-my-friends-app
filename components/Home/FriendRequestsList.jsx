import { Avatar, FlatList } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, Button, Icon } from 'react-native-elements'

const FriendRequestsList = ({ data }) => {

   const keyExtractor = (item, index) => index.toString()

   const fakeData = [
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' },
      { firstName: 'Ahmet Can' }
   ]
   const renderItem = ({ item }) => (
      <ListItem>
         <Icon name="person" />
         <ListItem.Content>
            <ListItem.Title>{item?.firstName} </ListItem.Title>
            <ListItem.Subtitle>{item?.email} </ListItem.Subtitle>

         </ListItem.Content>

         <Button type='outline' buttonStyle={{ borderColor: 'lightblue', borderWidth: '2', borderRadius: '25' }}
            icon={{
               name: "check",
               size: 25,
               color: "black"
            }}
         // title="object"
         />
         {/* <ListItem.Chevron /> */}
      </ListItem>
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

export default FriendRequestsList
