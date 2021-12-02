import React, { Component } from 'react'
import {
     View,
     Text,
     ImageBackground,
     StyleSheet,
     FlatList,
     TouchableOpacity,
     Platform,
     Alert,
     TouchableHighlightBase
} from 'react-native'

import AsyncStorage from '@react-native-comunity/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

import Task from '../components/Task'
import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../../src/commonStyles'
import AddTask from './AddTask'

const initialState = { 
     showDoneTasks: true,
     showAddTask: false,
     visibleTasks: [],
     tasks: []
 };

// Para DATAS
import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {
     state = {
          ...initialState
     }

     componentDidMount = async () => {
          const stateString = await AsyncStorage.getItem('tasksState')
          const state =  JSON.parse(stateString) || initialState
          this.setState(state, this.filterTasks)
          
     }

     toggleFilter = () => {
          // Sempre que você chamar esse metódo ele irá fazer a alternância
          this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
     }

     toggleTask = taskId => {
          const tasks = [...this.state.tasks]
          tasks.forEach(task => {
               if (task.id === taskId) {
                    task.doneAt = task.doneAt ? null : new Date()
               }
          })

          this.setState({ tasks }, this.filterTasks)
     }

     // Sempre o estado de uma task muda, esse método é chamado
     filterTasks = () => {
          let visibleTasks = null
          if (this.state.showDoneTasks) {
               visibleTasks = [...this.state.tasks]
          } else {
               const pending = task => task.doneAt === null
               visibleTasks = this.state.tasks.filter(pending)
          }

          this.setState({ visibleTasks })
          AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
     }

     addTask = (newTask) => {
          if (!newTask.desc || !newTask.desc.trim()) {
               Alert.alert('Dados Inválidos', 'Descrição não informada!')
               return
          }

          const tasks = [...this.state.tasks]
          tasks.push({
               id: Math.random(),
               desc: newTask.desc,
               estimateAt: newTask.date,
               doneAt: null,
          })

          this.setState({ tasks, showAddTask: false }, this.filterTasks)
     }

     deleteTask = id => {
          const tasks = this.state.tasks.filter(task => task.id !== id)
          this.setState({ tasks }, this.filterTasks)
     }

     render() {
          const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
          return (
               <View style={styles.container}>
                    <AddTask isVisible={this.state.showAddTask}
                         onCancel={() => this.setState({ showAddTask: false })}
                         onSave={this.addTask} />
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
                              data={this.state.visibleTasks}
                              keyExtractor={item => `${item.id}`}
                              renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask}  onDelete={this.deleteTask}/>} //Pegar os atributos do objeto e usar como parâmetros - Espalhando os atributos do nosso objeto para o componente
                         />
                    </View>
                    <TouchableOpacity
                         style={styles.addButton}
                         onPress={() => this.setState({ showAddTask: true })}
                         activeOpacity={0.7}
                    >
                         <Icon
                              name='plus'
                              size={20}
                              color={commonStyles.colors.secondary}
                         />
                    </TouchableOpacity>
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
     },
     addButton: {
          position: 'absolute', // Absolute quer dizer que ele vai ficar acima de outros
          right: 30,
          bottom: 30,
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: commonStyles.colors.today,
          justifyContent: 'center',
          alignItems: 'center',
     }

})

// Na web a row é o eixo principal 
// No reactNative tem o eixo principal como column