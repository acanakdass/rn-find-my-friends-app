import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, Button, Divider, HStack, Spinner, Heading, Center, useToast } from 'native-base';
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
import * as Location from 'expo-location';
// import { useNavigation } from '@react-navigation/core';
import SpinnerScreen from './components/Utils/SpinnerScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
export default function App() {

  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast()


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
      // console.log('Getting current user')
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
      authenticateAndStoreToken: (token) => {
        setisAuthenticated(true);
        storeToken(token)
      },
      // showToast: (type, text1, text2) => {
      //   Toast.show({
      //     type: type,
      //     text1: text1,
      //     text2: text2
      //   });
      // },
      signIn: (email, password) => {
        return authService.login(email, password)
      },
      signUp: (email, password, firstName, lastName) => {
        return authService.register(email, password, firstName, lastName)
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

      showToast: (description, title, placement, status) => {
        toast.show({
          description: 'description',
          title: title,
          placement: placement,
          status: status
        })
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
            // console.log('not null')
            // console.log(JSON.parse(jsonValue))
            return JSON.parse(jsonValue);
          }
        } catch (e) {
          console.log('error reading current user object : ' + e)
        }
      },
      getLocation: async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords)
        return {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      }
    }
  }, [])

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: 'white',
      text: 'white',
      accent: '#f1c40f',
    },
  };

  return (

    isLoading == false ? (
      <>
        <AuthContext.Provider value={authContext} >
          <PaperProvider theme={theme}>

            <NativeBaseProvider>
              <NavigationContainer>
                <RootStackNavigator isAuthenticated={isAuthenticated} />

              </NavigationContainer>
            </NativeBaseProvider>
          </PaperProvider>
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
