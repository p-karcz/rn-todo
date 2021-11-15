import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screens/Home'
import Done from './screens/Done'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{title: 'Things to do'}}/>
        <Stack.Screen name='Done' component={Done} options={{title: 'Things you have done'}} initialParams={[]}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
