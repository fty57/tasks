import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import commonStyles from '../../src/commonStyles'

import todayImage from '../../assets/imgs/today.jpg'

import Task from '../components/Task'

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
                              <Text style={styles.title}>Hoje</Text>
                              <Text style={styles.subtitle}>{today}</Text>
                         </View>
                    </ImageBackground>

                    <View style={styles.taskList}>
                         <Task desc='Comprar Livro' estimateAt={new Date()} doneAt={new Date()}/>
                         <Task desc='Ler Livro' estimateAt={new Date()} doneAt={null}/>
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
     title: {
          fontFamily: commonStyles.fontFamily,
          color: commonStyles.colors.secondary,
          fontSize: 50,
          marginLeft: 20,
          marginBottom: 20,
     },
     subtitle: {
          fontFamily: commonStyles.fontFamily,
          color: commonStyles.colors.secondary,
          fontSize: 20,
          marginLeft: 20,
          marginBottom: 30,
     }
     
})

// Na web a row é o eixo principal 
// No reactNative tem o eixo principal como column