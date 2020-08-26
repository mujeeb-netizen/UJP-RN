import React from 'react';
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Card, Input, Button, Header } from 'react-native-elements'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { editUser, editISRC } from '../store/actions'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../store/reducers'
import { TextInput } from 'react-native-paper';

export default function Login({ navigation }) {
    var [email, setEmail] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [logining, setLogining] = React.useState(false);
    const dispatch = useDispatch()
  async function tryLogin() {
        setLogining(true)
        await axios.post('http://ujp.somee.com/account/LoginUserAndroid', null, {
        params: {
            Email: email,
            Password: password
        }
    })
            .then(function (response) {


                AsyncStorage.setItem('email', JSON.stringify(response.data.data.email));
                AsyncStorage.setItem('userId', JSON.stringify(response.data.data.userID));
                AsyncStorage.setItem('name', JSON.stringify(response.data.data.name));
                AsyncStorage.setItem('org', JSON.stringify(response.data.data.organization));
                AsyncStorage.setItem('role', JSON.stringify(response.data.data.roleId));
                dispatch(editUser({ name: JSON.stringify(response.data.data.name), role: JSON.stringify(response.data.data.roleId), uid: JSON.stringify(response.data.data.userID)}))
                navigation.navigate("Home")
    })
        .catch(function (error) {
            alert("Invalid Credentials");
        });
        setLogining(false)
}
    return (
        <>
            <Header
            backgroundColor="#fff"
            barStyle="light-content"
            containerStyle={{ elevation: 5 }}
                leftComponent={{ text: 'UJP', style: { color: '#0750A4', fontSize: 35, marginLeft: 15, fontWeight: 'bold', marginBottom: '25%' } }}

            />
            <ScrollView contentContainerStyle={{    }} >
                <Card title="Login" backgroundColor='blue'
                    containerStyle={{
                        backgroundColor: '#fff',
                        marginTop: '20%',
                        borderBottomLeftRadius:50,
                        borderTopRightRadius: 50,
                        
                    }}
                    
                    titleStyle={{ color: '#0750A4', fontSize:20 }}
                >
                    <Image
                        style={{
                           
                            width: 150,
                            height: 150,
                            resizeMode: 'stretch',
                            alignSelf: 'center'
                        }}
                        source={require('../assets/splash.png')}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#0750A4', marginBottom: '10%' }} >Please login to continue</Text>
                <View style={{ marginTop:'0%' }}  >

                        <TextInput   dense label="Email" onChangeText={(text) => { setEmail(text); }} />
                    <Text>
                        {"\n"}
                    </Text>
                  

                        <TextInput dense label="Password" secureTextEntry={true}  onChangeText={(text) => { setPassword(text); }} />
                    <Text>
                        {"\n"}
                        </Text>
                        {logining ? <Button loadingStyle={{ color: '#0750A4' }} buttonStyle={{ backgroundColor: '#0750A4' }} titleStyle={{
                            color: '#fff'
                        }} title="Logining" loading /> : <Button buttonStyle={{ backgroundColor: '#0750A4' }} titleStyle={{
                            color: '#fff'}} title="Login" onPress={() => tryLogin()} />}
                    <Text>
                        {"\n"}
                    </Text>
                </View>

            </Card>
             </ScrollView>    
    </>
       );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
