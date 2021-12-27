import React from 'react';

import Main from '../components/Home/Main';
import { Ionicons } from '@expo/vector-icons';

import Friends from '../components/Home/Friends';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import Profile from '../components/Home/Profile';

import FriendRequests from '../components/Home/FriendRequests';
import SearchUser from '../components/Home/SearchUser';


const BottomTab = createMaterialBottomTabNavigator()
const HomeStackNavigator = () => (
   // <Tabs.Navigator>
   //   <Tabs.Screen name="Home" component={HomeStackScreen} />
   //   {/* <Tabs.Screen name="Profile" component={ProfileStackScreen} /> */}
   //   <Tabs.Screen name="Search" component={SearchStackScreen} />
   // </Tabs.Navigator>
   <BottomTab.Navigator

      style={{ color: 'white' }}
      // activeColor="#e91e63"
      activeColor="white"
      shifting
      labeled
      initialRouteName="Home"

      barStyle={{ backgroundColor: 'black', height: 70, marginBottom: 0, paddingBottom: 0 }}
      screenOptions={({ route }) => ({
         tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Main') {
               iconName = focused ? 'home' : 'home-outline';
               size = focused ? 25 : 20;
            } else if (route.name === 'Friends') {
               iconName = focused ? 'people' : 'people-outline';
               size = focused ? 25 : 20;
            } else if (route.name === 'Search') {
               iconName = focused ? 'search' : 'search-outline';
               size = focused ? 25 : 20;
            } else if (route.name === 'FriendRequests') {
               iconName = focused ? 'people' : 'people-outline';
               size = focused ? 25 : 20;
            } else if (route.name === 'Profile') {
               iconName = focused ? 'person' : 'person-outline';
               size = focused ? 25 : 20;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
         },

      })}

   >


      <BottomTab.Screen options={{ tabBarLabel: "Main" }} name="Main" component={Main} />
      <BottomTab.Screen options={{ tabBarLabel: "Search" }} name="Search" component={SearchUser} />
      <BottomTab.Screen options={{ tabBarLabel: "Friends" }} name="Friends" component={Friends} />
      <BottomTab.Screen options={{ tabBarLabel: "Friend Requests" }} name="FriendRequests" component={FriendRequests} />
      <BottomTab.Screen options={{ tabBarLabel: "Profile" }} name="Profile" component={Profile} />

   </BottomTab.Navigator>

)


export default HomeStackNavigator;