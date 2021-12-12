import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Center, HStack, Spinner, Heading } from 'native-base';

const SpinnerScreen = () => {
   return (
      <View style={styles.container}>
         <Center flex={1} px="3">
            <HStack space={2} alignItems="center">
               <Spinner accessibilityLabel="Loading posts" />
               <Heading color="white" fontSize="lg">
                  Loading
               </Heading>
            </HStack>
         </Center>

      </View>
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
export default SpinnerScreen
