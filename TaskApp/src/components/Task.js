// Quando um componente não tem estado, mas é interessante você criar um funcional
import React from 'react'
import {
     View,
     Text,
     StyleSheet,
     TouchableWithoutFeedback,
     TouchableOpacity
} from 'react-native'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

import commonStyles from '../commonStyles'

export default props => {

     const doneOrNotStyle = props.doneAt != null ?
          { textDecorationLine: 'line-through' } : {}
     // Significa que ele vai aplicar o estilo

     const date = props.doneAt ? props.doneAt : props.estimateAt
     const formatedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

     const getRightContent = () => {
          return(
               <TouchableOpacity style={styles.right}>
                    <Icon name='trash' size={30} color='#FFF'/>
               </TouchableOpacity>
          )
     }
     return (
          <Swipeable renderRightActions={getRightContent}>
               <View style={styles.container}>
                    <TouchableWithoutFeedback
                         onPress={() => props.toggleTask(props.id)}
                    >
                         <View style={styles.checkContainer}>
                              {getCheckView(props.doneAt)}
                         </View>

                    </TouchableWithoutFeedback>

                    <View>
                         <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                         <Text style={styles.date}>{formatedDate}</Text>
                    </View>

               </View>
          </Swipeable>

     )
}

function getCheckView(doneAt) {
     if (doneAt != null) {
          return (
               <View style={styles.done}>
                    <Icon name='check' size={20} color='#FFF'></Icon>
               </View>
          )
     } else {
          return (
               <View style={styles.pending}></View>
          )
     }

}

const styles = StyleSheet.create({
     container: {
          flexDirection: 'row',
          borderColor: '#AAA',
          borderBottomWidth: 1,
          alignItems: 'center',
          paddingVertical: 10
     },
     checkContainer: {
          width: '20%',
          alignItems: 'center',
          justifyContent: 'center',
     },
     pending: {
          height: 25,
          width: 25,
          borderRadius: 13,
          borderWidth: 1,
          borderColor: '#555'
     },
     done: {
          height: 25,
          width: 25,
          borderRadius: 13,
          backgroundColor: '#4D7031',
          alignItems: 'center',
          justifyContent: 'center',
     },
     desc: {
          fontFamily: commonStyles.fontFamily,
          color: commonStyles.colors.mainText,
          fontSize: 15
     },
     date: {
          fontFamily: commonStyles.fontFamily,
          color: commonStyles.colors.subText,
          fontSize: 12
     },
     right: {
          backgroundColor: 'red',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingHorizontal: 20
     }
})