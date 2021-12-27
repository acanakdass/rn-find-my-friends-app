import { useNavigation } from '@react-navigation/native'
import { FlatList } from 'native-base'
import React, { useEffect } from 'react'
import { TouchableHighlight, View, StyleSheet, Image } from 'react-native'
import { ListItem, Button, Icon, Text } from 'react-native-elements'
import AvatarCircle from '../Utils/AvatarCircle'

const FriendsList = ({ data, handleRemoveFriend }) => {

   const keyExtractor = (item, index) => index.toString()

   const navigation = useNavigation();



   const renderItem = ({ item }) => (
      <ListItem.Swipeable
         onPress={() => {
            navigation.navigate('Map', item)

         }}
         // accessible
         containerStyle={{ backgroundColor: 'black' }}
         leftContent={
            <Button
               onPress={() => console.log('info')}
               title="Info"
               icon={{ name: 'info', color: 'white' }}
               buttonStyle={{ minHeight: '100%' }}
            />
         }
         rightContent={
            <Button
               onPress={() => handleRemoveFriend(item.id)}
               title="Delete"
               icon={{ name: 'delete', color: 'white' }}
               buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
            />
         }
         style={{ backgroundColor: 'black' }}
      >
         <AvatarCircle size={50} imagePath={item.imagePath} />
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




