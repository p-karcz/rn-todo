import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard } from 'react-native'

import Task from '../components/Task'
import { HomeProps } from '../data/Utils'

export default function Home({ route, navigation }: HomeProps) {
    const [task, setTask] = useState<string>()
    const [tasks, setTasks] = useState<Array<string>>([])
    const [doneTasks, setDoneTasks] = useState<Array<string>>([])
  
    const handleAddTask = () => {
      if (typeof task != 'undefined') {
        Keyboard.dismiss()
        setTasks([...tasks, task])
        setTask(undefined)
      }
    }
  
    const handleCompleteTask = (index: number) => {
      let itemsCopy = [...tasks]
      let deletedTask = itemsCopy.splice(index, 1)[0]
      setDoneTasks([...doneTasks, deletedTask])
      setTasks(itemsCopy)
    }

    return(
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <View style={styles.items}>
                {
                    tasks.map((item, index) => {
                        return <Task key={index} text={item} onPress={() => handleCompleteTask(index)}/>
                    })
                }
                </View>
            </View>

            <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.writeTaskWrapper}>

            <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)}/>
            <TouchableOpacity style={styles.addWrapper} onPress={handleAddTask}>
                <Text>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addWrapper} onPress={() => navigation.navigate('Done', { doneTasks: doneTasks })}>
                <Text>-></Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED'
    },
    tasksWrapper: {
      padding: 20
    },
    items: {
      paddingTop: 30
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    input: {
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 60,
      borderColor: '#c0c0c0',
      borderWidth: 1,
      width: 250
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#c0c0c0',
      borderWidth: 1
    }
  })