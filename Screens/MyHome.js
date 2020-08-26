import React, { useEffect }  from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Input, Button, Header } from 'react-native-elements'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { editUser, editISRC } from '../store/actions'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../store/reducers'
import { Avatar, Card, Title, Paragraph, Divider, List, DataTable } from 'react-native-paper';
export default function MyHome({ navigation }) {
    const uid2 = useSelector(state => state.uid)
    const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: '#0750A4' }} icon="bullhorn" />
    const LeftContent2 = props => <Avatar.Icon {...props} style={{ backgroundColor: '#0750A4', color: '#fff' }} color="#fff" size={30} icon="label" />
    const [expanded, setExpanded] = React.useState(true);
    var [allcon, setAllcon] = React.useState([]);
    var [mysub, setMysub] = React.useState([]);
    function getCD(cid,sid) {

        

        navigation.navigate('ConferenceById', { cid: cid,sid:sid  })
    } 
    useEffect(() => {
        if (allcon == "") {


            axios.post('http://ujp.somee.com/Conference/GetAllConferenceandroid', null, null)
                .then(function (response) {

                    setAllcon(response.data)

                })
                .catch(function (error) {
                    alert(error);
                });
        }
     
        if (mysub == "") {

        axios.post('http://ujp.somee.com/ManuscriptSubmission/MySubmissionsAndroid', null, {
            params: {
                Uid: uid2
            }
        })
            .then(function (response) {
              
                setMysub(response.data)


            })
            .catch(function (error) {
                alert(error);
            });
    }
      
    })
  
    
    const handlePress = () => setExpanded(!expanded);
    var [email, setEmail] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [logining, setLogining] = React.useState(false);
    const dispatch = useDispatch()
    //async function tryLogin() {
    //    setLogining(true)
    //    await axios.post('http://ujp.somee.com/account/LoginUserAndroid', null, {
    //        params: {
    //            Email: email,
    //            Password: password
    //        }
    //    })
    //        .then(function (response) {


    //            AsyncStorage.setItem('email', JSON.stringify(response.data.data.email));
    //            AsyncStorage.setItem('userId', JSON.stringify(response.data.data.userID));
    //            AsyncStorage.setItem('name', JSON.stringify(response.data.data.name));
    //            AsyncStorage.setItem('org', JSON.stringify(response.data.data.organization));
    //            AsyncStorage.setItem('role', JSON.stringify(response.data.data.roleId));
    //            dispatch(editUser({ name: JSON.stringify(response.data.data.name), role: JSON.stringify(response.data.data.roleId), uid: JSON.stringify(response.data.data.userID) }))
    //            navigation.navigate("Home")
    //        })
    //        .catch(function (error) {
    //            alert(error);
    //        });
    //    setLogining(false)
    //}
    return (
        <>
          
            <ScrollView >
                <Card>
                    
                    <Card.Cover source={{ uri: 'https://res.cloudinary.com/du3j5iidy/image/upload/v1597609292/wq_rdmrsj.jpg' }} />
                    <Card.Content style={{ marginTop: '5%' }}>
                        <Title style={{ color:'#0750A4' }}>JOURNAL OF COMPUTER SCIENCE</Title>
                        <Divider />
                        <Paragraph> USMAN INSTITUTE OF TECHNOLOGY</Paragraph>
                        <Paragraph>
Researchers or paper writers can have a platform to submit their journal papers and
articles. They can have information about conferences for different researches.</Paragraph>
                    </Card.Content>
                    
                </Card>
                <Divider/>
                <Card>
                    <Card.Content style={{ marginTop: '5%' }}>
                        <Title style={{ color: '#0750A4' }}>My Submitted Conference Paper</Title>
                        <Divider />
                        
                    </Card.Content>
                    <Divider />
                    <Card.Content style={{ marginTop: '5%' }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>Title</DataTable.Title>
                                <DataTable.Title  >Status</DataTable.Title>
                                <DataTable.Title  >Action</DataTable.Title>
                            </DataTable.Header>

                           
                            {
                                mysub.map(mysubs => (

                                    <>
                                        <DataTable.Row>
                                            <DataTable.Cell> {mysubs.pTitle}  </DataTable.Cell>
                                            <DataTable.Cell> {mysubs.status} </DataTable.Cell>
                                            <DataTable.Cell onPress={() => getCD(mysubs.c_ID, mysubs.submissionID)}> View </DataTable.Cell>
                                             
                                        </DataTable.Row>
                                    </>
                                ))}


                            <DataTable.Pagination
                                page={1}
                                numberOfPages={1}
                                onPageChange={page => {
                                    console.log(page);
                                }}
                                label="1-2 of 6"
                            />
                        </DataTable>
                    </Card.Content>

                </Card>
                <Card>
                    
                    <Card.Title title="New Announcements" subtitle="Get your papers published on UJP" left={LeftContent} />
                    <Divider />
                    <Card.Content style={{ borderRadius: 20 }}>
                        <List.Section style={{ maxHeight: 183, borderRadius:20 }} titleStyle={{ color: '#0750A4' }} title="Latest Conferences">

                            <ScrollView>
                                {
                                allcon.map(allcons => (
                                    
                                    <>
                                        <List.Item onPress={() => getCD(allcons.c_ID,"0")} left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title={allcons.c_TITLE.trim()} />
                                        <Divider />
                                    </>
                                ))}
                            </ScrollView>
                        </List.Section>
                    </Card.Content>
                   
                </Card>
                <Divider />
         
              
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
