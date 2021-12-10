import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Image, ImageBackground } from 'react-native'
import { Text, Button, Input } from 'react-native-elements';
import { Paragraph, TextInput } from 'react-native-paper';
import Spacer from '../Spacer';
import AuthService from '../../services/AuthService';
import { AuthContext } from '../../contexts/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const AuthForm = ({ headerText, signButtonText, signFunc, errorMessage, navigation }) => {
   // const { signIn, goWithoutSignIn } = React.useContext(AuthContext)


   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [passwordRepeat, setPasswordRepeat] = useState('');
   const [errorText, setErrorText] = useState('');
   const { signIn, goWithoutSignIn } = React.useContext(AuthContext)

   const [isSigningIn, setIsSigningIn] = useState(false);
   // const signInAsync = async () => {
   //    setIsSigningIn(true)
   //    setTimeout(() => {
   //       setIsSigningIn(false)
   //    }, 3000)
   //    let authService = new AuthService();
   //    authService.login(username, password).then(res => {
   //       console.log(res.data.data.token)
   //       authService.setBearerToken(res.data.data.token)
   //       navigation.navigate("Home")
   //    }).catch(err => {
   //       console.log("Hata :" + err)
   //    })
   //    console.log(authService.login());
   // }
   return (
      <KeyboardAvoidingView>
         <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            <View style={styles.container}>
               <Text h3 style={{ textAlign: 'center', color: 'white' }}>{headerText}</Text>
               <Spacer margin={20} />
               <Paragraph style={{ textAlign: 'center', color: 'red' }}>{errorText}</Paragraph>
               <Input
                  leftIcon={
                     <Icon
                        name='user'
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
               <Spacer margin={5} />

               {signButtonText == 'Sign Up' ? (
                  <Input
                     placeholder="Confirm Password"
                     leftIcon={
                        <Icon
                           name='lock'
                           size={22}
                           color='lightgray'
                        />}
                     label="Repeat Password"
                     value={passwordRepeat}
                     secureTextEntry
                     onChangeText={(inputPw => setPasswordRepeat(inputPw))} />
               ) : (<View></View>)}
               <Spacer margin={10} />

               <Button

                  buttonStyle={{ backgroundColor: 'white' }}
                  disabledStyle={{ backgroundColor: 'gray' }}
                  disabledTitleStyle={{ color: 'black' }}
                  // loadingStyle={{ shadowColor: 'red', }}
                  loadingProps={{ color: 'black' }}
                  disabled={signButtonText == 'Sign Up' ? username === '' || password == '' || passwordRepeat == '' : username === '' || password == ''}
                  type="solid"
                  loading={isSigningIn}
                  title={signButtonText}
                  titleStyle={{ color: "black" }}
                  onPress={() => {
                     if (signButtonText == 'Sign In') {
                        setIsSigningIn(true)
                        signIn(username, password)
                        setTimeout(() => { setIsSigningIn(false) }, 4000)
                     } else if (signButtonText == 'Sign Up') {
                        setIsSigningIn(true)
                        signIn(username, password)
                        setTimeout(() => { setIsSigningIn(false) }, 4000)
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
