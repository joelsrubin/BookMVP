import React, { useCallback, useState, useEffect, useContext } from 'react';
import { RefreshControl, Image, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Context from '../context.js'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const { width } = Dimensions.get('window')

export default function Books() {
  let context = useContext(Context)
  const data = context.data.results.books
  const nonFict = context.nonFiction.results.books
  console.log("context:", context)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  return (
    <ScrollView vertical style={styles.main}>
      <ScrollView pagingEnabled decelerationRate={"slow"} snapToAlignment={'center'} horizontal style={styles.scroll}>
        {
          data.map((book, i) => (
            <TouchableOpacity onPress={() => { context.setRead(book) }} style={styles.image} key={i}>
              <Image source={{
                uri: book.book_image,
              }}
                style={{
                  width: 200,
                  height: 308,
                  margin: 'auto'
                }} />
            </TouchableOpacity>
          ))
        }
      </ScrollView>
      <Text style={styles.sectionText}>Fiction</Text>
      <ScrollView pagingEnabled decelerationRate={"slow"} snapToAlignment={'center'} horizontal contentContainerStyle={{ width: `${100 * 15}%` }} >
        {
          nonFict.map((book, i) => (
            <TouchableOpacity onPress={(e) => {
              e.preventDefault()
              context.setRead(book)
            }} style={styles.image} key={i}>
              <Image source={{
                uri: book.book_image,
              }}
                style={{ width: 200, height: 308, margin: 'auto' }} />

            </TouchableOpacity>
          ))
        }

      </ScrollView>
      <Text style={styles.sectionText}>NonFiction</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  main: {
    display: 'flex',
    flexDirection: 'column',

    height: '100%'
  },
  scroll: {
    flex: 4,

  },
  container: {
    fontSize: 30,
    backgroundColor: '#fff',


  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: 'center'
  },
  sectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1
  },
  button: {
    width: '100px'
  },
  image: {
    margin: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2

  }
});
