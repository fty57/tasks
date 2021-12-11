import { Alert, Platform } from 'react-native'

const server = Plataform.OS === 'ios'
     ? 'https://localhost:3000' : 'http://10.0.2.2:3000'

function showError(err) {
     if(err.response && err.response.data){
          Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err.response.data}`)
     }else{
          // Object.keys() assim você sabe exatamente as chaves que existem dentro 
          Alert.alert('Ops! Ocorreu um Problema!', `Mensagem: ${err}`)
     }
}

function showSuccess(msg) {
     Alert.alert('Sucesso!', msg)
}

export { server, showError, showSuccess }