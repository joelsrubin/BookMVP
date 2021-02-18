import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { GraphQLClient } from 'graphql-request'
import Context from '../context.js'

const graphcms = new GraphQLClient("https://api-ca-central-1.graphcms.com/v2/ckkwp0k2nbya701z7b6ze43go/master")

export default function Home({ navigation }) {
  const context = useContext(Context)
  let name = context.name
  let goal = context.goal

  const [registered, setRegistered] = useState(false)


  const nameToDB = async (name) => {
    const { createBook_User } = await graphcms.request(
      `mutation {
       createBook_User(data: {name: "${name}"}) {
       name
       id
          }
       }`
    )

    await graphcms.request(

      `mutation {
        updateBook_User(data: {numBooks: ${goal}}, where: {id: "${createBook_User.id}"}) {
        id
      }
    }
    `
    )

    await graphcms.request(

      `mutation {
        publishBook_User(to: PUBLISHED, where: {id: "${createBook_User.id}"}) {
          name
        }
      }
      `,
      { id: createBook_User.id }
    );
    await navigation.navigate("Main", {
      screen: 'Progress'
    })

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.titleText}> Book It </Text>
      <Text style={styles.emoji}>📚📚</Text>

      <View style={styles.inputContainer}>
        <Text >Name</Text>
        <TextInput textAlign={'center'} style={styles.input}
          onChangeText={text => context.setName(text)}
        ></TextInput>
        <Text >Goal</Text>
        <TextInput keyboardType={'numeric'} textAlign={'center'} style={styles.input}
          onChangeText={goal => context.setGoal(goal)}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <Button title="Let's Go" onPress={() => nameToDB(name)}></Button>
        </View>
      </View>
    </KeyboardAvoidingView >
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",

  },
  emoji: {
    fontSize: 50
  },
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,

  },
  inputContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  }
})