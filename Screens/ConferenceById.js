import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Header } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from '../store/actions'
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';  
import { Avatar, Button, Card, Title, Paragraph, Divider ,List} from 'react-native-paper';
export default function ConferenceById({ route, navigation }) {
   const { cid } = route.params;
     const { sid } = route.params;
    const uid2 = useSelector(state => state.uid)
    const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: '#0750A4' }} icon="account-group-outline" />
    const LeftContent2 = props => <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '1%', color: '#fff' }}>Start</Text>
    const LeftContent3 = props => <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '1%', color: '#fff' }}>End</Text>
    var [allcon, setAllcon] = React.useState([]);
    const [mysub, setMysub] = React.useState([]);
    var [is, setIs] = React.useState(null);
    var [res, setRes] = React.useState(null);
    var [load, setLoad] = React.useState(null);

    useEffect(() => {
        if (allcon == "") {
 getbyid(cid)
        } 
        if (is == null) {
            isAS(cid, uid2)
            
        }
        if (is != null && is != 0) {

            if (mysub == "") {
               

                setTimeout(function () { getsubmitteddetails(cid, uid2) },3000)
            }
          
        }
    })

    async function getsubmitteddetails(cid1, uid) {
        await axios.post('http://ujp.somee.com/Conference/GetSPDetailAuthorAndroid', null, {
            params: {  
                Userid: uid,
                CID: cid1,
                sid:sid
               
            }
        })
            .then(function (response) {
                

                    setMysub(response.data)
                    
                
                 
            })
            .catch(function (error) {
                alert(error);
            });
    }
    async function getbyid(cid) {
        await axios.post('http://ujp.somee.com/Conference/GetConferenceById', null, {
            params: {
                C_ID: cid,

            }
        })
            .then(function (response) {

                setAllcon(response.data)

            })
            .catch(function (error) {
                alert(error);
            });
        setLoad(true)
    }
    async function isAS(cid, uid) {
        await axios.post('http://ujp.somee.com/Account/IsSubmittedAndroid', null, {
            params: {
                C_ID: cid,
                U_ID: uid

            }
        })
            .then(function (response) {

                setIs(response.data)


            })
            .catch(function (error) {
                alert(error);
            });
    }
    if (!load) {
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
            
            );
    } else { 
    return (

        <>

            <Header
                leftComponent={<Ionicons name="md-menu" size={27} color="#0750A4" onPress={() => (navigation.openDrawer())} />}
                placement='left'
                backgroundColor="#fff"
                barStyle="light-content"
                containerStyle={{ elevation: 5 }}
                centerComponent={{ text: 'UJP', style: { color: '#0750A4', fontSize: 35, marginLeft: 15, fontWeight: 'bold' } }}

            />


            <ScrollView>
                <Card>

                    <Card.Cover source={{ uri: 'https://res.cloudinary.com/du3j5iidy/image/upload/v1597609292/wq_rdmrsj.jpg' }} />
                    <Card.Content style={{ marginTop: '5%' }}>
                        <Title style={{ color: '#0750A4' }}>{allcon.c_TITLE}</Title>
                        <Divider />
                        <Paragraph> {allcon.c_VENUE}</Paragraph>
                        <Paragraph>
                            {allcon.c_DESC}</Paragraph>
                    </Card.Content>

                </Card>
                <Card>
                    <Card.Content style={{ marginTop: '5%' }}>
                        <Title style={{ color: '#0750A4' }}>Start/End Date</Title>
                        <Divider />

                    </Card.Content>
                    <Divider />
                    <Card.Content style={{ marginTop: '5%' }}>
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title={allcon.c_START_DATE} />
                        <Divider />
                        <List.Item left={LeftContent3} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title={allcon.c_END_DATE} />
                        <Divider />
                    </Card.Content>

                </Card>
                <Card>
                    <Card.Content style={{ marginTop: '5%' }}>
                        <Title style={{ color: '#0750A4' }}> Area of Interest</Title>
                        <Divider />

                    </Card.Content>
                    <Divider />
                    <Card.Content style={{ marginTop: '5%' }}>
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title={allcon.c_AREAINTR} />
                        <Divider />

                    </Card.Content>

                </Card>
                <Card>
                    <Card.Content style={{ marginTop: '5%' }}>
                        <Title style={{ color: '#0750A4' }}> Deadline</Title>
                        <Divider />

                    </Card.Content>
                    <Divider />
                    <Card.Content style={{ marginTop: '5%' }}>
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title={allcon.deadline} />
                        <Divider />

                    </Card.Content>

                </Card>
                {is == 0
                    ?
                    <Card>
                        <Card.Content style={{ marginTop: '5%' }}>
                            <Button color="white" titleStyle={{ color: '#fff' }} style={{ color: '#fff', backgroundColor: '#0750A4' }}>Submit a Paper</Button>
                            <Divider />
                        </Card.Content>
                    </Card>
                    :

                    <></>
                }
                {mysub != "" ?
                    mysub.status.trim() == "Accepted" ?
                        <Card>
                            <Title style={{ color: '#0750A4' }}>Status: Paper {mysub.status.trim()  }</Title>
                            <Card.Content style={{ marginTop: '5%' }}>
                                <Button onPress={() => navigation.navigate('FeePayment', { irb: mysub.isroombooked, fee: mysub.fee_android, cid: cid, sid: sid })} color="white" titleStyle={{ color: '#fff' }} style={{ color: '#fff', backgroundColor: '#0750A4' }}>
                                  Please Pay Conference Fee
                                </Button>
                                <Divider />

                            </Card.Content>

                        </Card> : mysub.status.trim() == "PAIDINACTIVE" ? <></>
                    : <></>
                    :  <></>
                }
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
