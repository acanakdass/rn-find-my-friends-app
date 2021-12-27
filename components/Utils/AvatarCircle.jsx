import { useIsFocused } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'

const AvatarCircle = (props) => {

   const baseUrl = "http://5a1d-88-234-215-48.ngrok.io/";
   const isFocused = useIsFocused()
   React.useEffect(() => {
      console.log(props)
   }, [isFocused])
   return (
      <TouchableHighlight
         style={{
            height: props.size,
            width: props.size,
            padding: 2,
            borderRadius: 40,
            // borderWidth: 1
         }}
      >
         <Image source={{ uri: baseUrl + props.imagePath }}
            style={{
               height: props.size - 5,
               width: props.size - 5,
               borderRadius: 40,
            }} />
      </TouchableHighlight>
   )
}

export default AvatarCircle

const styles = StyleSheet.create({

   profileImg: {

   },
})