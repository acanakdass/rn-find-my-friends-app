import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios'
import Spacer from '../Spacer'
import SearchUserResultList from './SearchUserResultList'
import UserService from '../../services/UserService';
import { AuthContext } from '../../contexts/AuthContext';
import FriendsService from '../../services/FriendsService';
import { useIsFocused } from '@react-navigation/native'

const SearchUser = () => {
   const [searchValue, setSearchValue] = React.useState('')
   const [searchResults, setSearchResults] = React.useState([])

   const [currentUserId, setcurrentUserId] = React.useState();

   let userService = new UserService();
   let friendsService = new FriendsService();
   const { signIn, signOut, goWithoutSignIn, getStoredToken, getStoredUserObject } = React.useContext(AuthContext)
   const isFocused = useIsFocused()

   useEffect(async () => {
      if (currentUserId == undefined) {

         await getStoredUserObject().then(res => {
            console.log(res)
            setcurrentUserId(res.id);
         })
      }
      console.log('currentUserId : ' + currentUserId)
      handleSearch('')
   }, [currentUserId, isFocused])

   // useEffect(() => {
   //    if (currentUser != {}) {

   //    }
   //    // console.log('setting friends')
   // }, [currentUser, isFocused])

   const handleSearch = (value) => {
      userService.searchByUsernameOrEmail(value).then(res => {
         setSearchResults(res.data.data.filter(f => f.id != currentUserId))
      })
   }

   return (
      <View style={styles.container}>
         <SearchBar
            leftIcon={{ iconStyle: { backgroundColor: 'red' } }}
            searchIcon={{ iconStyle: { color: 'white' } }}
            clearIcon={{ iconStyle: { color: 'white' } }}
            containerStyle={{ backgroundColor: 'black' }}
            inputStyle={{ color: 'white' }}
            // inputContainerStyle={{ color: 'white' }}
            placeholder="Search Username or Email"
            placeholderTextColor='gray'
            selectionColor='white'

            onChangeText={(value) => {
               console.log('searching value changed')
               setSearchValue(value)
               handleSearch(value)
            }}
            value={searchValue}
         />
         {/* <Spacer margin={5} /> */}
         <SearchUserResultList currentUserId={currentUserId} data={searchResults} />
      </View>
   )
}

export default SearchUser

const styles = StyleSheet.create({
   container: { backgroundColor: 'black', flex: 1, paddingBottom: 70, height: '100%' }
})