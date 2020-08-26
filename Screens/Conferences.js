import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, PricingCard  } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import axios from 'axios';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
export default function Conferences({ navigation }) {
    const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: '#0750A4' }} icon="account-group-outline" />
    var [allcon, setAllcon] = React.useState([]);
    function getCD(cid) {



        navigation.navigate('ConferenceById', { cid: cid })
    }
    useEffect(() => {

        axios.post('http://ujp.somee.com/Conference/GetAllConferenceandroid', null, null)
            .then(function (response) {
              
                setAllcon(response.data)

            })
            .catch(function (error) {
                alert(error);
            });
    })
    if (allcon == null || typeof allcon == "undefined" || allcon == "" || allcon == []) {
        return (

            <></>)
    }
    else { 
        return ( 
        
       <>
             

                <ScrollView>
                  
                    {
                    allcon.map(allcons => (
                        //<PricingCard
                        //    color="#4f9deb"
                        //    title={}
                        //    price={allcons.c_START_DATE}
                        //    info={[]}
                        //    button={{ title: 'APPLY NOW' }}
                        //    onButtonPress={() => alert(allcons.c_ID)}
                        ///>
                        <>
                        <Card>
                            <Card.Title title={allcons.c_TITLE.trim()} subtitle={allcons.c_VENUE.trim()} left={LeftContent} />

                          
                                <Card.Actions>
                                    <Button onPress={() => getCD(allcons.c_ID)} color='#0750A4'  >READ MORE</Button>
                                    <Button  color='#0750A4'>APPLY</Button>
                            </Card.Actions>
                        </Card>
                            <Divider />
                        </>
                    ))}
                </ScrollView>
            
     </>
    );
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
