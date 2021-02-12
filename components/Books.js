import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Context from '../context.js'

export default function Books() {

  return (
    <Context.Consumer>
      {context => context.data ? (<View style={styles.container}>
        {context.data.results.books.map((book) => (<Button width='20%' title={book.title}></Button>))}
        <StatusBar style="auto" />
      </View>) : (<View><Text>Loading</Text></View>)
      }

    </Context.Consumer >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    fontSize: '26px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    width: '100px'
  }
});
