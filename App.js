import React, { useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { editUser, editISRC } from './store/actions' 
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers'
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Logout from './Screens/Logout';
import ConferenceById from './Screens/ConferenceById';
import FeePayment from './Screens/FeePayment';

const store = createStore(rootReducer)
const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function App() {
    // const [uid, setUid] = useState(null);
    const uid2 = useSelector(state => state.uid)
    const role2 = useSelector(state => state.role)
    const name2 = useSelector(state => state.name)
    const dispatch = useDispatch()
 
    var result455;
    

    
    useEffect(() => {


        AsyncStorage.getItem('userId')
            .then(results1 => {
                if (results1 === null) {
                   
                }
                else {
                    
                    
                    AsyncStorage.getItem('role')
                        .then(results621 => {
                            AsyncStorage.getItem('name')
                                .then(results6 => {

                                 
                                    const data = {

                                        uid: results1,
                                      
                                        name: results6,
                                        role: results621
                                    }


                                    dispatch(editUser(data))

                                })
                          
                            
                        })

                
                }
            })
    }, [])

    const Drawer = createDrawerNavigator();
    const myStackNavigator = () => {
        return (
            <>

                <Drawer.Navigator headerShown="true" >

                    {uid2 === null || uid2 == "null" ?
                        <>
                            <Drawer.Screen style={{ backgroundColor: 'red' }} name="Home" component={Home} />
                            <Drawer.Screen name="Login" component={Login} />
                         
                           

                        </> :
                        role2 == null || role2 == "null" ?
                            <>

                                <Drawer.Screen name="Home" component={Home} />
                                <Drawer.Screen name="Logout" component={Logout} />
                         
                        </>
                            :
                            <>
                                <Drawer.Screen name="Home" component={Home} />
                                <Drawer.Screen name="Logout" component={Logout} />
                            </>
                    }
                </Drawer.Navigator>
            </>
        )
    }
  return (
      <>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerShown: false
              }}>
                  <Stack.Screen name="UJP" component={myStackNavigator} />
                  <Stack.Screen name="ConferenceById" component={ConferenceById} />
                  <Stack.Screen name="FeePayment" component={FeePayment} />
                  
                  
              </Stack.Navigator>
          </NavigationContainer>
      </>
  );
}

export default function myFunction() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
