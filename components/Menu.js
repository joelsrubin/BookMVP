import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import { API } from './utils.js'
import Context from '../context.js'


export default function Menu({ navigation }) {
  const context = useContext(Context)

  const click = (e) => {
    let val = e.target.innerHTML
    context.handler(val)
  }

  if (context.data) {

    return (

      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('Books')}
          title='HardCover Fiction'>
        </Button>
        <Button
          onPress={() => navigation.navigate('Books')}
          title='HardCover Nonfiction'>
        </Button>
        <StatusBar style="auto" />
      </View>

    )
  } else {
    return (
      (<View style={styles.body}><ActivityIndicator size="large" /></View>)
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
    fontSize: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',

  },
  body: {
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto'
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  }
});