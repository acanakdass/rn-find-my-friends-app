import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, ToastAndroid, ImageBackground, Text } from 'react-native'

import { Button } from 'react-native-elements/dist/buttons/Button';
import AuthForm from './AuthForm';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../contexts/AuthContext';

const SigninScreen = ({ navigation }) => {

   const { signIn, goWithoutSignIn } = React.useContext(AuthContext)

   // const goWithoutSignIn = () => {
   //    navigation.navigate('Home')
   // }
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
            type="clear"
            title="Don't have an account? Sign Up"
            onPress={() => navigation.push("Signup")}
         />
         <Button
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