import React, { useRef, useState, useEffect, useContext } from 'react';
import { Share, Pressable, Modal, StatusBar, Animated, ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import Context from '../context.js'

export default function Social() {
  let context = useContext(Context)
  let time = context.date
  let currentTime = new Date
  console.log(time.getTime())
  const timeCalc = () => {
    let diffInTime = currentTime.getTime() - time.getTime();
    let diffInDays = diffInTime / (1000 * 3600 * 24)
    if (Math.floor(diffInDays) === 1) {
      return `${Math.floor(diffInDays)} day!`
    }
    return `${Math.floor(diffInDays)} days!`
  }

  const bookEmojiMaker = () => {
    let str = '';
    for (let i = 0; i < context.done.length; i++) {
      str += '📚'
    }
    return str
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Thanks Book It! You motivated me to finish ${context.done.length} books in ${timeCalc()} Learn more at www.joelrubin.dev #HiLO`,
      })

    } catch (err) {
      alert(err.message)
    }
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titleMain}>Wow you finished {context.done.length} books in {timeCalc()}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.emoji}>{bookEmojiMaker()}</Text>
      </View>
      <View style={styles.container}>
        <Button onPress={onShare} title="Give the HiLO"></Button>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
})