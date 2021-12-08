import { Button } from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Friends = ({ navigation }) => {
   return (
      <View>
         <Text>friends screen</Text>
         <Button onPress={() => navigation.navigate('FriendRequests')} >See friend requests</Button>
      </View>
   )
}

export default Friends

const styles = StyleSheet.create({})
