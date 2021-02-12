import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home.js'
import Books from './components/Books.js'
import { API } from './components/utils.js';
import BooksContext from './context.js'

import axios from 'axios';

const Stack = createStackNavigator()


export default function App() {

  const [bestSellers, setBestSellers] = useState(null)
  useEffect(() => {
    const fetchBooks = () => {
      axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${API}`)
        .then((results) => {
          setBestSellers(results.data)
        })
    }
    fetchBooks()
  }, [])

  return (
    <BooksContext.Provider
      value={{
        data: bestSellers
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'BookEnds' }} />
          <Stack.Screen name="Books"
            component={Books}
            options={{ title: 'Books' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </BooksContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: '26px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
