import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, ToastAndroid } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button';
import AuthForm from './AuthForm';

const SignUpScreen = ({ navigation }) => {

   return (
      <View style={styles.container}>

         <AuthForm
            headerText="Sign Up!"
            errorMessage=""
            signButtonText="Sign Up"
         // signFunc={({ email, password }) => signIn({ email, password })}
         />
         <Button
            titleStyle={{ color: "white" }}
            type="clear"
            title="Already have an account? Sign In"
            onPress={() => navigation.navigate("Signin")}
         />
      </View>
   )
}

export default SignUpScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'black'
   }
})
