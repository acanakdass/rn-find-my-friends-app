import { Center, Spinner, VStack } from 'native-base'
import React from 'react'
import { View, Text } from 'react-native'

const SingleSpinner = () => {
   return (
      <View >
         <Center flex={1} px="3" marginTop={100}>
            <VStack space={4} alignItems="center">
               <Spinner size="lg" />
            </VStack>
         </Center>
      </View>
   )
}

export default SingleSpinner
