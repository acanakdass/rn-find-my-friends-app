import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'

const AvatarCircle = () => {
   return (
      <TouchableHighlight
         style={[styles.profileImgContainer]}
      >
         <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU" }} style={styles.profileImg} />
      </TouchableHighlight>
   )
}

export default AvatarCircle

const styles = StyleSheet.create({
   profileImgContainer: {
      marginLeft: 8,
      height: 50,
      width: 50,
      borderRadius: 40,
   },
   profileImg: {
      height: 50,
      width: 50,
      borderRadius: 40,
   },
})