import React, { useState, useEffect, useContext } from 'react';
import { TextInput, ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { GraphQLClient } from 'graphql-request'

const graphcms = new GraphQLClient("https://api-ca-central-1.graphcms.com/v2/ckkwp0k2nbya701z7b6ze43go/master")

export default function Home({ navigation }) {
  const [name, setName] = useState(null)
  const [registered, setRegistered] = useState(false)
  console.log(name)

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
        publishBook_User(to: PUBLISHED, where: {id: "${createBook_User.id}"}) {
          name
        }
      }
      `,
      { id: createBook_User.id }
    );

  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}> Welcome </Text>
      <Text style={styles.titleText}> {name}</Text>
      <Text style={styles.emoji}>📚</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          onChangeText={text => setName(text)}
        ></TextInput>
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={() => nameToDB(name)}></Button>
          <Button title="Main Menu" onPress={() => navigation.navigate("Menu")}></Button>
        </View>
      </View>
      <div></div>
    </View >
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 20,
    flex: 2,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
    fontSize: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  emoji: {
    fontSize: 50
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})