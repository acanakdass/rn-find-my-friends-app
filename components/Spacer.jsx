import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Spacer = ({ children, margin }) => {
   return (
      <View style={{ marginVertical: margin }}>
         {children}
      </View>
   )
}

export default Spacer

const styles = StyleSheet.create({
   spacer: {
      marginVertical: 10
   }
})
