import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

import todayImage from '../../assets/imgs/today.jpg'

export default class TaskList extends Component {
     render() {
          return (
               <View style={styles.container}>
                    <ImageBackground
                         source={todayImage}
                         style={styles.background}>

                    </ImageBackground>

                    <View style={styles.taskList}>
                         <Text>TaskList</Text>
                    </View>
               </View>
          )
     }
}


const styles = StyleSheet.create({
     container: {
          flex: 1, // Você permite que esse container cresça, é a mesma coisa de flexGrow
     },
     background: {
          flex: 3 // Como você dividisse sua tela em partes - 30%
     },
     taskList: {
          flex: 7 // Cresce - 70%
     }
})
