import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

import todayImage from '../../assets/imgs/today.jpg'

// Para DATAS
import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {
     render() {
          const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
          return (
               <View style={styles.container}>
                    <ImageBackground source={todayImage} style={styles.background}>
                         <View style={styles.titleBar}>
                              <Text>Hoje</Text>
                              <Text>{today}</Text>
                         </View>
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
     },
     titleBar: {
          flex: 1,
          justifyContent: 'flex-end'
     },
     
})

// Na web a row é o eixo principal 
// No reactNative tem o eixo principal como column