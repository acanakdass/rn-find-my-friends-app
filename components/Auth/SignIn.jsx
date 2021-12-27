import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, ToastAndroid, ImageBackground, Text } from 'react-native'

import { Button } from 'react-native-elements/dist/buttons/Button';
import AuthForm from './AuthForm';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../contexts/AuthContext';
import { color } from 'react-native-elements/dist/helpers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import Urls from '../../services/BaseUrl';

const SigninScreen = ({ route, navigation }) => {

   const { signIn, goWithoutSignIn } = React.useContext(AuthContext)

   return (

      <View style={styles.container}>

         <AuthForm
            navigation={navigation}
            headerText="Sign In To Your Account"
            errorMessage=""
            signButtonText="Sign In"
         // signFunc={() => signIn()}
         />
         {/* <SocialIcon
            title='Sign In With Facebook'
            button
            type='facebook'
         /> */}
         <Button
            titleStyle={{ color: "white" }}
            type="clear"
            title="Don't have an account? Sign Up"
            onPress={() => navigation.push("Signup")}
         />
         <Button
            titleStyle={{ color: "white" }}
            type="clear"
            title="Go without Sign In"
            onPress={() => goWithoutSignIn()}
         />
         {/* <ImageBackground blurRadius={2} source={image} style={styles.image}>
         </ImageBackground> */}

      </View >

   )
}

export default SigninScreen

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'black',
      flex: 1,
      flexDirection: 'column',
   },
   image: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
   },
   text: {
      color: 'white',
      fontSize: 42,
      fontWeight: 'bold',
      textAlign: 'center',
      backgroundColor: '#000000a0',
   },
})