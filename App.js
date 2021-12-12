import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, Button, Divider, HStack, Spinner, Heading, Center } from 'native-base';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import HomeNavgiator from './NavigatorScreens/HomeStackNavigator';
import RootStackNavigator from './NavigatorScreens/RootStackNavigator';
import AuthService from './services/AuthService';
import { AuthContext } from './contexts/AuthContext';
import UserService from './services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import SpinnerScreen from './components/Utils/SpinnerScreen';

export default function App() {



  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const authService = new AuthService();

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('bearer', token)
    } catch (e) {
      // saving error
      console.log('storage error')
    }
  }

  const removeToken = async () => {

    await AsyncStorage.removeItem('bearer')

  }


  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('bearer')
      if (value !== null) {
        // value previously stored
        setToken(value)
      }
    } catch (e) {
      // error reading value
      console.log('storage reading error')

    }
  }

  useEffect(() => {
    setIsLoading(true)
    let userService = new UserService();
    getToken();

    console.log("token: " + token)
    userService.getCurrentUser(token).then(res => {
      console.log('Getting current user')
      setisAuthenticated(true)
    }).catch(err => {
      console.log('Cant get current user')

      setisAuthenticated(false);
      // setIsLoading(false)
    }).finally((final) => {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    })
  }, [token])


  const authContext = React.useMemo(() => {
    return {
      signIn: (email, password) => {
        authService.login(email, password).then(res => {
          // console.log(res.data);
          setisAuthenticated(true);
          storeToken(res.data.data.token)
        })
        // authService.login(email, password).then(res => {
        //   console.log("res.data")
        //   console.log(res.data)
        //   setToken(res.data.data)
        //   setisAuthenticated(true)
        //   AsyncStorage.setItem('token', res.data.data)
        // }).catch(err => {
        //   setisAuthenticated(false)
        //   console.log("Giriş Kontrolü Başarısız : " + err) 
        // })
        console.log('sign in')
      },
      signUp: (email, password, firstName, lastName) => {
        authService.register(email, password).then(res => {
          // console.log(res.data);
          setisAuthenticated(true);
          storeToken(res.data.data.token)
        })
      },
      // signOut: () => {
      //   console.log('Signing out')
      //   removeToken();
      //   setToken(null);
      //   setisAuthenticated(false)
      // },
      signOut: async () => {
        const keys = ['bearer', 'currentUserObj']
        try {
          await AsyncStorage.multiRemove(keys)
          setToken(null);
          setisAuthenticated(false)
        } catch (e) {
          // remove error
        }
        console.log('Done')
      },


      goWithoutSignIn: () => {
        setisAuthenticated(true)
      },
      getStoredToken: () => {
        try {
          const value = AsyncStorage.getItem('bearer')
          if (value !== null) {
            // value previously stored
            return value;
          } else {
            console.log("value null" + value)
          }
        } catch (e) {
          // error reading value
          console.log('storage reading error')

        }
      },
      getStoredUserObject: async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('currentUserObj')
          // console.log('jsonValue')
          // console.log(jsonValue)
          if (jsonValue == null) {
            console.log('Data is null');
            return null;
          } else {
            console.log('not null')
            // console.log(JSON.parse(jsonValue))
            return JSON.parse(jsonValue);
          }
        } catch (e) {
          console.log('error reading current user object : ' + e)
        }
      }
    }
  }, [])



  return (
    isLoading == false ? (
      <>
        <AuthContext.Provider value={authContext} >
          <NativeBaseProvider>
            <NavigationContainer>
              <RootStackNavigator isAuthenticated={isAuthenticated} />
            </NavigationContainer>
          </NativeBaseProvider>
        </AuthContext.Provider >
      </>
    ) : (
      <NativeBaseProvider>
        <SpinnerScreen />
      </NativeBaseProvider>

    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
