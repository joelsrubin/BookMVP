import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Home from './components/Home'
import Books from './components/Books'
import Social from './components/Social'
import Progress from './components/Progress'
import { API } from './components/utils';
import BooksContext from './context'
import axios from 'axios';

const Stack = createStackNavigator()


export default function App() {

  const [bestSellers, setBestSellers] = useState(null)
  const [nonFiction, setNonFiction] = useState(null)
  const [genre, setGenre] = useState('hardcover-fiction')
  const [name, setName] = useState(null)
  const [goal, setGoal] = useState(0)
  const [read, setRead] = useState([])
  const [done, setDone] = useState([])
  const [date, setDate] = useState(new Date)

  useEffect(() => {
    const fetchBooks = () => {
      axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API}`)
        .then((results) => {
          console.log(results)
          setBestSellers(results.data)
        })
        .then(() => {
          axios.get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${API}`)
            .then((results) => {
              console.log(results)
              setNonFiction(results.data)
            })
        })
    }
    fetchBooks()
  }, [])



  const genreClick = (val) => {
    setGenre(val)
  }

  const nameClick = (val) => {
    setName(val)
  }

  const goalClick = (val) => {
    setGoal(val)
  }

  const readClick = (val) => {
    if (!read.includes(val)) {
      setRead([...read, val])
    } else {
      alert('already added')
    }
  }

  const doneClick = (val) => {
    if (!done.includes(val)) {
      setDone([...done, val])
    }
    if (read.includes(val)) {
      let index = read.indexOf(val)
      let arr = read
      arr.splice(index, 1)
      setRead(arr)
      // read.splice(index, 1)
    }
  }

  const clearRead = () => {
    setRead([])
    setDone([])
  }

  const Tab = createBottomTabNavigator();

  const TabScreen = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Progress" component={Progress} options={{ tabBarBadge: read.length }} />
        <Tab.Screen name="Books" component={Books} />
      </Tab.Navigator>
    );
  }

  return (
    <BooksContext.Provider
      value={{
        data: bestSellers,
        nonFiction: nonFiction,
        handler: genreClick,
        setName: nameClick,
        setRead: readClick,
        setGoal: goalClick,
        clearRead: clearRead,
        setDone: doneClick,
        done: done,
        name: name,
        goal: goal,
        read: read,
        date: date
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Log In'
            }} />
          < Stack.Screen
            name="Main"
            component={TabScreen}
            options={{ title: 'Main' }} />
          <Stack.Screen
            name="Social"
            component={Social}
            options={{ title: 'Let em Know' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </BooksContext.Provider>
  )
};




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
