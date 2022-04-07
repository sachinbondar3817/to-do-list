import axios from 'axios'
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Task from './components/Task';

export default function App() {
  const [text, setText] = useState('');
  const [ usersData, setUsersData ] = useState([])
  const handleSubmit = () => {
    setText(null);
    saveData()
  };
  postData = {
    "userId": 11,
    "title": text,
    "completed": true
  }
  const saveData = () => {
    axios.post('https://jsonplaceholder.typicode.com/todos',postData).then( response => {
      if(response && response.status === 201 ){
        alert("created successfully")
      }
    })
  }
  useEffect(() => {
    getUsersData()
  },[])

const getUsersData = () => {
  axios.get('https://jsonplaceholder.typicode.com/todos').then( response => {
    if( response && response.status === 200){
      setUsersData(response.data)
    }
  })
}

    const removeItem = (index) => {
      axios.delete(`${'https://jsonplaceholder.typicode.com/todos'}/${index}/`).then( response => {
        if(response && response.status === 200){
          alert("deleted")
        }
      })
    }
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}> To do List</Text>
        <View style={styles.items}>
          {usersData.map((item, index) => <Task id={index} text={item.title} removeItem={ removeItem }/>)}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={text}
          onChangeText={(text) => setText(text)}
        />

        <TouchableOpacity onPress={() => handleSubmit()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
