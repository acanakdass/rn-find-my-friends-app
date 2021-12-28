import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { Button, Divider } from 'native-base';
import { Avatar, Card, IconButton } from 'react-native-paper';
import AvatarCircle from '../Utils/AvatarCircle';
import * as ImagePicker from 'expo-image-picker';
import UserService from '../../services/UserService';

const Profile = () => {
   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const isFocused = useIsFocused();

   const [formData, setFormData] = useState()
   const [image, setImage] = useState(null);

   const [isLoading, setIsLoading] = useState(false)

   const [currentUser, setcurrentUser] = useState({})
   useEffect(() => {
      // console.log('Getting current user object from async storage');
      // console.log(getStoredUserObject())
      getStoredUserObject().then(res => setcurrentUser(res))
   }, [isFocused])

   const userService = new UserService();

   const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 0.1,
      });

      console.log(result);

      if (!result.cancelled) {
         setImage(result.uri);
         console.log()

         let data = new FormData()
         data.append("Image", {
            uri: result.uri,
            type: result.type,
            name: result.uri
         });
         data.append('UserId', currentUser.id);
         setFormData(data)
      }
   };

   const uploadRequest = () => {
      setIsLoading(true)
      userService.uploadImage(formData).then(res => {
         console.log('uploading')
         console.log(res.data)
      }).catch(er => {
         console.log('err: ' + er)
      }).finally(() => {
         console.log('request ended finally')
         setIsLoading(false)
      })
   }
   return (
      <View style={styles.container}>
         <Card.Title

            title={currentUser.firstName + " " + currentUser.lastName}
            subtitle={currentUser.email}
            left={(props) => <AvatarCircle size={50} imagePath={currentUser.imagePath} />}
            right={(props) => <IconButton {...props} icon="menu" onPress={() => { }} />}
         />
         <Button onPress={() => {
            signOut()
         }}>Sign Out</Button>

         <Button onPress={pickImage}>Pick an image from camera roll</Button>
         {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
         <Button isLoading={isLoading} onPress={uploadRequest}>Upload Image</Button>
      </View>
   )
}

export default Profile
const styles = StyleSheet.create({
   container: { backgroundColor: 'black', flex: 1 },
   text: {
      color: 'white'
   }
})
