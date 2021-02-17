import React, { useCallback, useState, useEffect, useContext } from 'react';
import { RefreshControl, Image, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Context from '../context.js'



const { width } = Dimensions.get('window')

function Books() {

  let context = useContext(Context)
  const data = context.data.results.books
  const nonFict = context.nonFiction.results.books


  return (
    <ScrollView vertical style={styles.main}>
      <ScrollView pagingEnabled decelerationRate={"slow"} snapToAlignment={'center'} horizontal style={styles.scroll}>
        {
          data.map((book, i) => (
            <TouchableOpacity onPress={() => { context.setRead(book) }} style={styles.image} key={book.title}>
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
      <ScrollView pagingEnabled decelerationRate={"slow"} snapToAlignment={'center'} horizontal  >
        {
          nonFict.map((book, i) => (
            <TouchableOpacity onPress={() => {
              context.setRead(book)
            }} style={styles.image} key={book.title}>
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
export default Books
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
