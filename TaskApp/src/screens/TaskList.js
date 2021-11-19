import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native'
import commonStyles from '../../src/commonStyles'

import todayImage from '../../assets/imgs/today.jpg'
import Icon from 'react-native-vector-icons/FontAwesome'

import Task from '../components/Task'

// Para DATAS
import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {
     state = {
          showDoneTasks: true,
          tasks: [{
               id: Math.random(),
               desc: 'Comprar Livro de React Native',
               estimateAt: new Date(),
               doneAt: new Date()
          }, {
               id: Math.random(),
               desc: 'Ler Livro de React Native',
               estimateAt: new Date(),
               doneAt: null
          }]
     }

     toggleFilter = () => {
          // Sempre que você chamar esse metódo ele irá fazer a alternância
          this.setState({ showDoneTasks: !this.state.showDoneTasks })
     }

     toggleTask = taskId => {
          const tasks = [...this.state.tasks]
          tasks.forEach(task => {
               if (task.id === taskId) {
                    task.doneAt = task.doneAt ? null : new Date()
               }
          })

          this.setState({ tasks })
     }

     render() {
          const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
          return (
               <View style={styles.container}>
                    <ImageBackground source={todayImage} style={styles.background}>
                         <View style={styles.iconBar}>
                              <TouchableOpacity onPress={this.toggleFilter}>
                                   <Icon
                                        name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                        size={20}
                                        color={commonStyles.colors.secondary}
                                   />
                              </TouchableOpacity>
                         </View>
                         <View style={styles.titleBar}>
                              <Text style={styles.title}>Hoje</Text>
                              <Text style={styles.subtitle}>{today}</Text>
                         </View>
                    </ImageBackground>

                    <View style={styles.taskList}>
                         <FlatList
                              data={this.state.taskes}
                              keyExtractor={item => `${item.id}`}
                              renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} />} //Pegar os atributos do objeto e usar como parâmetros - Espalhando os atributos do nosso objeto para o componente
                         />
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
     },
     iconBar: {
          flexDirection: 'row',
          marginHorizontal: 20,
          justifyContent: 'flex-end',
          marginTop: Platform.OS === 'ios' ? 40 : 10 // Utilizando um estilo condicional
     }

})

// Na web a row é o eixo principal 
// No reactNative tem o eixo principal como column