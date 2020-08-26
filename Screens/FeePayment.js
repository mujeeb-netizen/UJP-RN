import React from 'react';
import { StyleSheet, Text, View, ScrollView,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Input, Button, Header } from 'react-native-elements'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { editUser, editISRC } from '../store/actions'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../store/reducers'
import { TextInput } from 'react-native-paper';
import { Avatar, Card, Title, Paragraph, Divider, List } from 'react-native-paper';


export default function FeePayment({ navigation, route }) {
    const { irb } = route.params;
    alert(irb)
    const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: '#0750A4' }} icon="account-group-outline" />
    const LeftContent2 = props => <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '1%', color: '#fff' }}>></Text>

    var [email, setEmail] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [logining, setLogining] = React.useState(false);
    const [mysub, setMysub] = React.useState([]);
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (mysub == "") {
            tryLogin()
          
        }
        else {
             
        }
    })
  async function tryLogin() {
        setLogining(true)
      await axios.post('http://ujp.somee.com/Conference/GetAccountAndroid', null, null)
            .then(function (response) {

                setMysub(response.data) 
              
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
            <ScrollView>
                {
                    typeof mysub != "undefined" || mysub == "" ?
                        <>
                            <Card>

                    <Card.Title title="Bank Details" left={LeftContent} />
                    <Card.Content style={{ marginTop: '5%' }}>

                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="Bank Name" descriptionStyle={{ color: '#fff' }} description={mysub.bankName} />
                        <Divider />
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="Account Title" descriptionStyle={{ color: '#fff' }} description={mysub.accountTitle} />
                        <Divider />
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="Account #" descriptionStyle={{ color: '#fff' }} description={mysub.accountNo} />
                        <Divider />
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="Branch Code" descriptionStyle={{ color: '#fff' }} description={mysub.branchCode} />
                        <Divider />
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="IBAN #" descriptionStyle={{ color: '#fff' }} description={mysub.iban} />


                    </Card.Content>

                        </Card>
                        <Card>

                    <Card.Title title="Room Reservation" left={LeftContent} />
                    <Card.Content style={{ marginTop: '5%' }}>
                                    {irb != "" ?
                                        <>
                                            <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="Room Already Reserved" />
                                            <Divider />
                                        </>
                                        :
                                        <>

                                        </>

                                    }

                    </Card.Content>

                            </Card>
                            </>
            :
            <></>
            }
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
