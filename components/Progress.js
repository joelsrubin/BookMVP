import React, { useRef, useState, useEffect, useContext } from 'react';
import { Pressable, Modal, StatusBar, Animated, ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import List from './List'
import Context from '../context.js'

function Bar({ percent, moveAnim, name, step, goal, height }) {



  console.log('moveAnim:', moveAnim)

  return (
    <>
      <Text style={styles.titleMain}>{name}'s Progress</Text>
      <Text style={styles.titleText}>
        {step}/{goal}
      </Text>
      <View
        style={{
          height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: height,
          overflow: 'hidden',
        }}>
        <Animated.View
          style={{
            height,
            width: moveAnim,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: height,
            position: 'absolute',
            left: 0,
            top: 0,
          }} />
      </View>
    </>
  )
}

export default function Progress({ navigation, route }) {
  const context = useContext(Context)
  let step = context.done.length

  const goal = context.goal || 10
  const name = context.name || 'Test'
  let percent = (step / goal) * 100
  console.log("percent:", percent)

  const moveAnim = new Animated.Value(0);
  console.log(moveAnim)

  const moveRight = () => {
    Animated.timing(moveAnim, {
      toValue: (step / goal) * 340,
      duration: 1000,
      useNativeDriver: false
    }).start()
  };

  useEffect(() => {
    moveRight()
  }, [step])

  return (

    <View style={styles.container}>
      <StatusBar hidden />
      {/* <Button onPress={moveRight} title="move it"></Button> */}
      <Bar percent={percent} moveAnim={moveAnim} name={name} style={styles.bar} step={step} goal={goal} height={20} />
      <List />
      <View style={styles.buttonCon}>
        <Button onPress={() => { navigation.navigate('Social') }} title="all done?"></Button>
        <Button onPress={context.clearRead} title="clear list"></Button>
      </View>
    </View>

  )
}


const styles = StyleSheet.create({
  buttonCon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
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