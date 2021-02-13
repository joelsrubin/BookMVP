import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './components/Menu'
import Home from './components/Home'
import Books from './components/Books'
import { API } from './components/utils';
import BooksContext from './context'

import axios from 'axios';

const Stack = createStackNavigator()


export default function App() {

  const [bestSellers, setBestSellers] = useState(null)
  const [genre, setGenre] = useState('hardcover-fiction')
  useEffect(() => {
    const fetchBooks = () => {
      axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/${genre}.json?api-key=${API}`)
        .then((results) => {
          console.log(results)
          setBestSellers(results.data)
        })
    }
    fetchBooks()
  }, [genre])

  const genreClick = (val) => {
    setGenre(val)
  }

  return (
    <BooksContext.Provider
      value={{
        data: bestSellers,
        handler: genreClick
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Bookish'
            }} />
          < Stack.Screen
            name="Menu"
            component={Menu}
            options={{ title: 'Menu' }} />
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
    fontSize: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});
