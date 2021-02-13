import React, { useCallback, useState, useEffect, useContext } from 'react';
import { RefreshControl, Image, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Context from '../context.js'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Books() {
  let context = useContext(Context)
  const data = context.data.results.books
  console.log("data:", data)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}>
        {
          data.map((book, i) => (
            <View key={i}>
              <Image source={{
                uri: book.book_image,
              }}
                style={{ width: 335, height: 500, margin: 'auto' }} />
              <Text style={styles.titleText}>{book.title}</Text>
            </View>
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
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
    fontWeight: "bold",
    textAlign: 'center'
  },
  button: {
    width: '100px'
  }
});
