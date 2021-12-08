import React from 'react';

import Main from '../components/Home/Main';
import { Ionicons } from '@expo/vector-icons';

import Friends from '../components/Home/Friends';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';

import FriendRequests from '../components/Home/FriendRequests';

const BottomTab = createMaterialBottomTabNavigator()
const HomeStackNavigator = () => (
   // <Tabs.Navigator>
   //   <Tabs.Screen name="Home" component={HomeStackScreen} />
   //   {/* <Tabs.Screen name="Profile" component={ProfileStackScreen} /> */}
   //   <Tabs.Screen name="Search" component={SearchStackScreen} />
   // </Tabs.Navigator>
   <BottomTab.Navigator
      // activeColor="#e91e63"
      activeColor="black"
      shifting
      labeled
      initialRouteName="Home"
      barStyle={{ backgroundColor: 'white', height: 70, marginBottom: 0, paddingBottom: 20 }}
      screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
               iconName = focused ? 'home' : 'home-outline';
               size = focused ? 25 : 20;
            } else if (route.name === 'Friends') {
               iconName = focused ? 'search' : 'search-outline';
               size = focused ? 25 : 20;
            } else if (route.name === 'FriendRequests') {
               iconName = focused ? 'user-friends' : 'user-friends';
               size = focused ? 25 : 20;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
         },

      })}

   >
      <BottomTab.Screen options={{ tabBarLabel: "Main" }} name="Main" component={Main} />
      <BottomTab.Screen options={{ tabBarLabel: "Friends" }} name="Friends" component={Friends} />
      <BottomTab.Screen options={{ tabBarLabel: "Friend Requests", tabBarIcon: () => (<FontAwesome5 name="users" size={24} color="black" />) }} name="FriendRequests" component={FriendRequests} />

   </BottomTab.Navigator>
)


export default HomeStackNavigator;

















// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Friends from '../components/Home/Friends';
// import FriendRequests from '../components/Home/FriendRequests';

// const HomeStack = createNativeStackNavigator();

// const HomeStackNavigator = () => {
//    return (
//       <HomeStack.Navigator>
//          <HomeStack.Screen name="Friends" component={Friends} options={{ title: 'Friends', headerShown: true }} />
//          <HomeStack.Screen name="FriendRequests" component={FriendRequests} options={{ title: 'Friend Requests', headerShown: true }} />
//       </HomeStack.Navigator>
//    )
// }

// export default HomeStackNavigator

// const styles = StyleSheet.create({})
