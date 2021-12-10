import React, { Component } from 'react'
import {
     View,
     ActivityIndicator,
     StyleSheet
} from 'react-native'

import axios from 'axios'
import { AsyncStorage } from '@react-native-community/async-storage'

export default class AuthOrApp extends Component {
     
     componentDidMount = async () => {
          // Pra ele poder esperar antes de ir para próxima linha
          const userDataJson = await AsyncStorage.getItem('userData')
          let userData = null

          try{
               userData = JSON.parse(userDataJson)
          } catch (e) {
               // userData está inválido
          }

          if(userData && userData.token){
               // Se tiver o userData e o seu token, leva para a janela de Home
               axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
               this.props.navigation.navigate('Home', userData)
          }else{
               // Caso contrário, leva para a tela de autenticação
               this.props.navigation.navigate('Auth')
          }
     }

     render(){
          return (
               <View style={styles.container}>
                    <ActivityIndicator size='large'/>
               </View>
          )
     } 
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000'   
     }
})