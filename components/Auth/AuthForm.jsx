import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Image, ImageBackground } from 'react-native'
import { Text, Button, Input } from 'react-native-elements';
import { Paragraph, TextInput } from 'react-native-paper';
import Spacer from '../Spacer';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'native-base';

const AuthForm = ({ headerText, signButtonText, signFunc, errorMessage, navigation }) => {


   const [username, setUsername] = useState('');
   const [firstName, setFirstName] = useState('');
   const [password, setPassword] = useState('');
   const [passwordRepeat, setPasswordRepeat] = useState('');
   const [errorText, setErrorText] = useState('');
   const { signIn, signUp, goWithoutSignIn, authenticateAndStoreToken } = React.useContext(AuthContext)

   const navigatior = useNavigation();
   const [isSigningIn, setIsSigningIn] = useState(false);

   const toast = useToast();

   const handleSignIn = () => {
      setIsSigningIn(true)

      signIn(username, password).then(res => {
         if (res.data.success) {
            console.log(res.data.data.token)
            // showToast('success', 'welcome', 'signed in')  
            authenticateAndStoreToken(res.data.data.token)
            toast.show({
               title: res.data.message,
               placement: 'top',
               status: 'success'
            })
            setIsSigningIn(false)
         } else {
            toast.show({
               title: res.data.message,
               placement: 'top',
               status: 'error'
            })
            setIsSigningIn(false)
         }
      }
      ).finally(f => {
         setIsSigningIn(false)
      })
   }

   const handleSignUp = () => {
      setIsSigningIn(true)

      signUp(username, password, firstName).then(res => {
         console.log(res.data)
         navigatior.goBack()
         setIsSigningIn(false)
      }
      ).catch(err => {
         console.log('Hata olduu: ' + err)
         setIsSigningIn(false)
      }).finally(f => {
         setIsSigningIn(false)
         console.log('fianlly worked')
      })
   }
   return (
      <KeyboardAvoidingView>
         <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container}>
               <Text h3 style={{ textAlign: 'center', color: 'white' }}>{headerText}</Text>
               <Spacer margin={20} />
               <Paragraph style={{ textAlign: 'center', color: 'red' }}>{errorText}</Paragraph>
               {signButtonText == 'Sign Up' ? (
                  <>
                     <Input
                        placeholder="Firstname"
                        leftIcon={
                           <Icon
                              name='user'
                              size={22}
                              color='lightgray'
                           />}
                        style={{ color: 'white' }}
                        label="First Name"
                        value={firstName}
                        onChangeText={(inputPw => setFirstName(inputPw))} />
                  </>
               ) : (<View></View>)}
               <Spacer margin={10} />
               <Input
                  leftIcon={
                     <Icon
                        name='envelope-o'
                        size={22}
                        color='lightgray'
                     />}
                  style={{ color: 'white' }}
                  placeholder="Email or Username"
                  label="Username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
               // mode="flat"
               // outlineColor="lightgray"

               />
               <Spacer margin={5} />
               <Input
                  leftIcon={
                     <Icon
                        name='lock'
                        size={22}
                        color='lightgray'
                     />}
                  placeholder="Your Password"
                  style={{ color: 'white' }}
                  label="Password"
                  value={password}
                  secureTextEntry
                  onChangeText={(inputPw => setPassword(inputPw))} />
               {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
               {/* <Spacer margin={5} />

               {signButtonText == 'Sign Up' ? (
                  <Input
                     placeholder="Confirm Password"
                     leftIcon={
                        <Icon
                           name='lock'
                           size={22}
                           color='lightgray'
                        />}
                     style={{ color: 'white' }}
                     label="Repeat Password"
                     value={passwordRepeat}
                     secureTextEntry
                     onChangeText={(inputPw => setPasswordRepeat(inputPw))} />
               ) : (<View></View>)} */}
               <Spacer margin={10} />

               <Button

                  buttonStyle={{ backgroundColor: 'white' }}
                  disabledStyle={{ backgroundColor: 'gray' }}
                  disabledTitleStyle={{ color: 'black' }}
                  // loadingStyle={{ shadowColor: 'red', }}
                  loadingProps={{ color: 'black' }}
                  disabled={signButtonText == 'Sign Up' ? username === '' || password == '' : username === '' || password == ''}
                  type="solid"
                  loading={isSigningIn}
                  title={signButtonText}
                  titleStyle={{ color: "black" }}
                  onPress={() => {
                     if (signButtonText == 'Sign In') {
                        handleSignIn()
                     } else if (signButtonText == 'Sign Up') {
                        handleSignUp()
                     }
                  }}
               />

            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}

export default AuthForm

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      // marginBottom: 100,
      marginHorizontal: 30,
      marginTop: 90
   },
   contentContainerStyle: {
      paddingVertical: 50,
   },
   errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 2
   }
})
