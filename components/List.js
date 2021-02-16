import React, { useRef, useState, useEffect, useContext } from 'react';
import { Pressable, Modal, ScrollView, Image, SectionList, SafeAreaView, StatusBar, Animated, ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import Context from '../context.js'



const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function List() {
  let context = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false)
  const [curBook, setCurBook] = useState(null)

  const addToList = async (val) => {
    await context.setDone(val)
    await setModalVisible(!modalVisible)
  }

  const resetCurBook = async (val) => {
    await setCurBook(val)
    await setModalVisible(!modalVisible)
  }
  const DATA = context.read || []

  console.log(DATA)

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
            >
              <Button onPress={() => addToList(curBook)} title="done"></Button>
            </Pressable>
          </View>
        </View>
      </Modal>
      <ScrollView horizontal style={styles.scroll}>
        {context.done.map((item, i) => (
          <Pressable
            key={i}
            onPress={() => resetCurBook(item)}
          >
            <View style={styles.image} >
              <Image source={{
                uri: item.book_image,
              }}
                style={{ width: 112, height: 166, margin: 'auto', }} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.titleText}>Read</Text>
      <ScrollView horizontal style={styles.scroll}>
        {DATA.map((item, i) => (
          <Pressable
            key={i}
            onPress={() => resetCurBook(item)}
          >
            <View style={styles.image} >
              <Image source={{
                uri: item.book_image,
              }}
                style={{ width: 112, height: 166, margin: 'auto', }} />
            </View>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={styles.titleText}>To Read</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    position: 'relative'
  },
  titleText: {

    marginBottom: 8,
    fontSize: 12,
    fontWeight: "bold"
  },

  titleMain: {

    marginBottom: 8,
    fontSize: 30,
    fontWeight: "bold"
  },
  bar: {
    position: 'absolute',
    bottom: 0
  },
  scroll: {
    flex: 1,
    marginTop: 22,
  },
  image: {
    padding: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})