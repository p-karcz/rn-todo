import React from 'react'
import { StyleSheet, View} from 'react-native'

import Task from '../components/Task'
import { DoneProps } from '../data/Utils'

export default function Done({ route, navigation }: DoneProps) {
    return(
        <View style={styles.container}>
            {
                route.params.doneTasks.map((item, index) => {
                    return <Task key={index} text={item} />
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
      padding: 20,
      paddingTop: 30
    }
})