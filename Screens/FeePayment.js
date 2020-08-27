import React from 'react';
import { StyleSheet, Text, Picker,View, ScrollView,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Input, Button, Header } from 'react-native-elements'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { editUser, editISRC } from '../store/actions'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../store/reducers'
import { TextInput, Caption } from 'react-native-paper';
import { Avatar, Card, Title, Paragraph, Divider,Switch  ,List } from 'react-native-paper';


export default function FeePayment({ navigation, route }) {
    const { irb } = route.params;
    const { fee } = route.params;
    var [hotelname, setHotelname] = React.useState(null);
    const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: '#0750A4' }} icon="account-group-outline" />
    const LeftContent2 = props => <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '1%', color: '#fff' }}>*</Text>
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    var [email, setEmail] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [logining, setLogining] = React.useState(false);
    const [mysub, setMysub] = React.useState([]);
    const [hotels, setHotels] = React.useState([]);
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (mysub == "") {
            tryLogin()
          
        }
        if (hotels == "") {
            if(irb == "" && isSwitchOn == true ){

            getHotels()
            }
        }
     
    })
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
async function getHotels() {
    setLogining(true)
  await axios.post('http://ujp.somee.com/Conference/getHotels', null, null)
        .then(function (response) {
setHotels(response.data)
            alert(JSON.stringify(response.data)) 
          
})
    .catch(function (error) {
        alert("Invalid Credentials");
    });
    setLogining(false)
}
 
 function getRoomType(val) {
    
      setHotelname(val)

     setTimeout(function(){alert("here "  + val + " " + hotelname)},2000)
//     setLogining(true)
//   await axios.post('http://ujp.somee.com/Conference/getHotels', null, null)
//         .then(function (response) {
// setHotels(response.data)
//             alert(JSON.stringify(response.data)) 
          
// })
//     .catch(function (error) {
//         alert("Invalid Credentials");
//     });
//     setLogining(false)

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
                        <Divider />
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="Payable amount" descriptionStyle={{ color: '#fff' }} description={fee} />


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
                                        <View style={{alignItems:'flex-start'}} >
                                            <Caption style={{marginLeft:'3%',fontSize:15}}>
                                                Want a Room(s)?
                                            </Caption>
<Switch value={isSwitchOn} color="#0750A4"style={{marginLeft:'3%'}} onValueChange={onToggleSwitch} />
                                        </View>
}

   { isSwitchOn == true ?
     <Card>
          <Card.Title title=" Select Hotel" left={LeftContent} />
         <Picker
        selectedValue={hotelname}
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => { getRoomType(itemValue)}}
        style={{backgroundColor:'#b3d1f5'}}
      >
           <Picker.Item label="Select Here"  />
         {
                    hotels.map(hotel => (
                        <Picker.Item label={hotel.name} value={hotel.id} />
                    ))}
        
        
        
      </Picker>
             
</Card>
:
<View>
<Text>
    off hai
    </Text>
</View>
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
