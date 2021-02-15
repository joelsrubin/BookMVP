import React, { useRef, useState, useEffect, useContext } from 'react';
import { StatusBar, Animated, ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import List from './List'
import Context from '../context.js'

function Bar({ name, step, goal, height }) {

  const [width, setWidth] = useState(0)
  const getPercent = () => {

    let percent = (step / goal) * 100
    return percent
  }
  return (
    <>
      <Text style={styles.titleMain}>{name}'s Progress</Text>
      <Text style={styles.titleText}>
        {step}/{goal}
      </Text>
      <View
        onLayout={e => {
          const newWidth = e.nativeEvent.layout.width;
          setWidth(newWidth)
        }}
        style={{
          height,
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderRadius: height,
          overflow: 'hidden',

        }}>
        <Animated.View

          style={{
            height,
            width: `${getPercent()}%`,
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
  const goal = context.goal || 10
  const name = context.name || 'Test'
  console.log("goalprog:", goal)
  return (

    <View style={styles.container}>
      <StatusBar hidden />
      <Bar name={name} style={styles.bar} step={context.done.length} goal={goal} height={20} />
      <List />

      <Button onPress={context.clearRead} title="clear list"></Button>
    </View>

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
  }
})