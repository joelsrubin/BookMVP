import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import { API } from './utils.js'
import Context from '../context.js'


export default function Home({ navigation }) {

  return (
    <Context.Consumer>
      {context => context.data ? (<View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('Books')}
          title={context.data.results.list_name}>
        </Button>
        <StatusBar style="auto" />
      </View>) : (<View><Text>Loading</Text></View>)}

    </Context.Consumer>
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