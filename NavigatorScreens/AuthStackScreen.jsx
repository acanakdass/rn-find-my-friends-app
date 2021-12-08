import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SignIn from '../components/Auth/SignIn';
import SignUp from '../components/Auth/SignUp';


const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
   return (
      <AuthStack.Navigator>
         <AuthStack.Screen name="Signin" component={SignIn} options={{ title: 'Sign In', headerShown: false }} />
         <AuthStack.Screen name="Signup" component={SignUp} options={{ title: 'Sign In', headerShown: false }} />
      </AuthStack.Navigator>
   )
}

export default AuthStackScreen

const styles = StyleSheet.create({})
