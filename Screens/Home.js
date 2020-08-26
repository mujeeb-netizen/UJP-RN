import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../store/actions'
import { editUser } from '../store/actions'
import { Icon, Card, Button, Header } from 'react-native-elements'
import { AsyncStorage } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Conferences from './Conferences';
import MyHome from './MyHome';
import Articles from './Articles';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


export default function Home({ navigation }) {
    const uid = useSelector(state => state.uid)
    const role = useSelector(state => state.role)
    const uname = useSelector(state => state.name)
    var rolename = null;
    const CreateTabs = createMaterialTopTabNavigator();

    if (uname != null) {
        var tempname = uname.replace(/['"]+/g, '')
        if (role == 1) {
            rolename = "Author";
        } else if (role == 2) {
            rolename = "Admin";
        } else if (role == 3) {
            rolename = "Reviewer";
        } else if (role == 4) {
            rolename = "Editor";
        }
        else {
            rolename = "Other"
                ;
        }
        var a = tempname.trim() + " - " + rolename;
    }
    var [mainload, setMainload] = React.useState(false);
    useEffect(() => {

        setTimeout(() => {
            setMainload(true)
        }, 3000)
   
    }, [])
    if (!mainload) {
        return (
            <View style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Button

                    title="Loading"
                    type="clear"
                    loading
                />
            </View>
        )
    } else { 
    return (
        <>
            {!uid ?<>
                <Header
                    backgroundColor="#fff"
                    barStyle="light-content"
                    containerStyle={{ elevation: 5 }}
                    leftComponent={{ text: 'UJP', style: { color: '#0750A4', fontSize: 35, marginLeft: 15, fontWeight: 'bold', marginBottom:'25%' } }}
                    />
                <View style={styles2.container}  >

                    <View style={{ position: 'absolute', top: 0, alignItems: 'center' }}>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                style={{
                                    marginTop: '25%',
                                    width: 200,
                                    height: 200,
                                    resizeMode: 'stretch',
                                }}
                                source={require('../assets/uit.png')}
                            />
                            <Text style={{ marginTop: '0%', color: '#0750A4', fontSize: 20 }}>  Journal of Computer Science  </Text>
                        </View>
                    </View>
                    {!uid ?
                        <View style={styles2.loginForm} >

                            <Button type="outline" titleStyle={{ color: '#fff' }} buttonStyle={{ backgroundColor: '#0750A4', width: '100%', borderWidth: 1, borderColor: 'white' }} style={{ marginBottom: '5%' }} onPress={() => (navigation.navigate("Login", {
                                reg: 'no'
                            }))} style={{ width: "100%" }} title="Login" />
                           
                            
                                                    </View>
                        : <></>}
                </View></>:
                <>
               
                    
                    <Header
                        leftComponent={<Ionicons name="md-menu" size={27}  color="#0750A4" onPress={() => (navigation.openDrawer())} />}
                        placement='left'
                        backgroundColor="#fff"
                        barStyle="light-content"
                        containerStyle={{ elevation: 5 }}
                        centerComponent={{ text: 'UJP', style: { color: '#0750A4', fontSize: 35, marginLeft: 15, fontWeight: 'bold' } }}

                    />
                    <CreateTabs.Navigator options={{
                      
                        activeBackgroundColor: 'blue'

                    }}>
 <CreateTabs.Screen name="My Home" component={MyHome} options={{
                            tabBarLabel: 'My Home',
                            tabBarIcon: () => (
                                <Ionicons name="md-ribbon" color="#3281a8" size={28} />
                            ),
                            activeBackgroundColor:'blue'
                           
                        }} />
                        <CreateTabs.Screen  name="Conference" component={Conferences} options={{
                            tabBarLabel: 'Conference',
                            tabBarIcon: () => (
                                <Ionicons name="md-ribbon" color="#3281a8" size={28} />
                            ),
                            activeBackgroundColor:'blue'
                           
                        }} />
                       
                        <CreateTabs.Screen name="Articles" component={Articles} options={{
                            tabBarLabel: 'Published Articles',
                            tabBarIcon: () => (
                                <Ionicons name="md-ribbon" color="#3281a8" size={28} />
                            ),
                        }} />
                    </CreateTabs.Navigator>
                    </>
            }
        </>);
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
var styles2 = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch'

    },
    loginForm: {
        position: 'absolute',
        justifyContent: 'center',

        bottom: 50,
        left: 50,
        right: 50,

    },
});