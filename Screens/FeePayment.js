import React from 'react';
import { StyleSheet, Text, Picker, View, TouchableOpacity,ScrollView,Image } from 'react-native';
import { AsyncStorage } from 'react-native';
import { Icon, Input, Button, Header } from 'react-native-elements'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { editUser, editISRC } from '../store/actions'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../store/reducers'
import { TextInput, Caption } from 'react-native-paper';
import { Avatar, Card, Title, Paragraph, Divider, Switch, Snackbar  ,List } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'
import * as ImagePicker from 'expo-image-picker';
 

export default function FeePayment({ navigation, route }) {
    var { irb } = route.params;
    const { fee } = route.params;
    const { cid } = route.params;
    const { sid } = route.params;
    const uid = useSelector(state => state.uid)
    var [fee1, setFee] = React.useState(fee);
    var [hotelname, setHotelname] = React.useState(null);
    var [isrb, setIsrb] = React.useState(irb);
    const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: '#0750A4' }} icon="account-group-outline" />
    const LeftContent2 = props => <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: '1%', color: '#fff' }}>*</Text>
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    var [email, setEmail] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [logining, setLogining] = React.useState(false);
    const [mysub, setMysub] = React.useState([]);
    const [hotels, setHotels] = React.useState([]);
    const [hoteltype, setHoteltype] = React.useState([]);
    var [roomtype, setRoomtype] = React.useState(null);
    var [available, setRoomavailable] = React.useState(null);
    var [needed, setRoomneeded] = React.useState(null);
    var [days, setDays] = React.useState(1);
    var [charge, setcharge] = React.useState(0);
    var [prevfee, setPrevfee] = React.useState(0);
 
    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
    }

    var [total, setTotal] = React.useState(0);
    var [noofrooms, setNoofrooms] = React.useState(null);
    const dispatch = useDispatch()
    const [visible, setVisible] = React.useState(false);
    function ConfirmIt() {

        axios.post('http://ujp.somee.com/Admin/BookNowAndroid', null, {
            params: {
                UserID: uid,
                CID: cid,
                SID: sid,
                charges: charge,
                qty: needed,
                days: days,
                fee: fee,
                hotel_id: hotelname,
                rumc: charge
            }
        })
            .then(function (response) {

                setIsrb(1)
                setIsSwitchOn(false)

            })
            .catch(function (error) {
                alert("Invalid Credentials");
            });
    }
    function CheckRooms(text) {
        setRoomneeded(text)
        var a = roomtype.split("-");
         
          axios.post('http://ujp.somee.com/Admin/checkroomsAndroid',null , {
            params: {
                  charges: a[0].trim(),
                  hotelid: hotelname
            }
        })
            .then(function (response) {

                setRoomavailable(response.data)
              
                if (typeof text != 'undefined' && text != "" && text != null && text != 0) {
                   

                    setFee(fee + (parseInt(a[1].trim()) * text * days))
                 
                }
                
            })
            .catch(function (error) {
                alert("Invalid Credentials");
            });
  
    }

    function setTotal1(text) {
        setRoomneeded(1)
        if (typeof text != 'undefined' && text != "" && text != null) {
            var a = text.split("-");
            setcharge(parseInt(a[1].trim()))
            setFee(fee + (parseInt(a[1].trim())))
        }
        else {
            setFee(fee)
        }
       
       
  
    }
    function setDaystotal(text) {
       
        if (typeof text != 'undefined' && text != "" && text != null) {

            setFee(fee + (charge * needed * text))
        }
    
       
       
  
    } 
    
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
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        if (isSwitchOn == true) {
            setFee(fee)
        }
        else {

            setRoomtype(null)
            setDays(1)
            setHotelname(null)
            setRoomneeded(1)
        }
    };
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
           
          
})
    .catch(function (error) {
        alert("Invalid Credentials");
    });
    setLogining(false)
}
 
 async function getRoomType(val) {
    
     

     
     
     await axios.post('http://ujp.somee.com/Admin/gethoteltypeAndroid', null, {
         params: {
             H_ID: val,
             

         }
     })
         .then(function (response) {
             
             setHoteltype(response.data)
             alert(JSON.stringify(response.data)) 
             setHotelname(val)
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
                        <Divider />
                        <List.Item left={LeftContent2} style={{ backgroundColor: '#0750A4' }} titleStyle={{ color: '#fff' }} title="Payable amount" descriptionStyle={{ color: '#fff' }} description={fee1} />


                    </Card.Content>

                        </Card>
                        <Card>

                    <Card.Title title="Room Reservation" left={LeftContent} />
                                <Card.Content style={{ marginTop: '5%' }}>
                                    {isrb != "" ?
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

                                    {isSwitchOn == true ?
                                        <>
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
                                            {
                                                hoteltype != "" ?
                                                <Card>
                                                    <Card.Title title=" Select Room Type" left={LeftContent} />
                                                        <Picker
                                                            selectedValue={roomtype}
                                                            style={{ height: 50, width: '100%' }}
                                                            onValueChange={(itemValue, itemIndex) => { setRoomtype(itemValue); setTotal1(itemValue); }}
                                                        style={{ backgroundColor: '#b3d1f5' }}
                                                    >
                                                        <Picker.Item label="Select Here" />
                                                        {
                                                            hoteltype.map(hotel => (
                                                                <Picker.Item label={hotel.type_name} value={hotel.type_id + "-" + hotel.charges} />
                                                            ))}



                                                    </Picker>

                                                </Card>
                                                    : <>
                                                    </>
                                            }
                                            {
                                                roomtype != null ?
                                                    <>
                                                        <Card>
                                                        <Card.Title title="how many rooms?" left={LeftContent} />

                                                            <NumericInput
                                                                value={needed}
                                                                onChange={(value) => { CheckRooms(value); }} 
                                                                minValue={1}
                                                                totalWidth={240}
                                                                totalHeight={50}
                                                                iconSize={25}
                                                                step={1}
                                                                valueType='real'
                                                                rounded
                                                                textColor='#B0228C'
                                                                iconStyle={{ color: 'white' }}
                                                                rightButtonBackgroundColor='#0750A4'
                                                                leftButtonBackgroundColor='#075078' />
                                                            
                                                            
                                                        {
                                                            needed > available ?
                                                                <Text style={{ color: 'red', marginLeft:'2%',fontWeight:'bold' }}>
                                                                    {needed} Room(s) not available
                                                                </Text> :
                                                                <>
                                                                </>
                                                        }
                                                         
                                                    </Card>
                                                    <Card>
                                                        <Card.Title title="how many days?" left={LeftContent} />
                                                            <NumericInput
                                                                value={days}
                                                                onChange={(value) => { setDays(value); setDaystotal(value) }}
                                                                minValue={1}
                                                                totalWidth={240}
                                                                totalHeight={50}
                                                                iconSize={25}
                                                                step={1}
                                                                valueType='real'
                                                                rounded
                                                                textColor='#B0228C'
                                                                iconStyle={{ color: 'white' }}
                                                                rightButtonBackgroundColor='#0750A4'
                                                                leftButtonBackgroundColor='#075078' />

                                                       

                                                        </Card>

                                                        <Card>
                                                            <Card.Title title="Confirm Reservation" left={LeftContent} />
                                                            <Button title="Confirm" onPress={() => { ConfirmIt() } }/>
                                                        </Card>


                                                        </>
                                                    :
                                                    <>
                                                    </>
                                            }


                                            </>
:
<View>

</View>
}

                                    
                    </Card.Content>

                            </Card>
                            </>
            :
            <></>
                }
                <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Pick a photo</Text>
                </TouchableOpacity>

                <Snackbar
                    visible={visible}
                    onDismiss={() => { console.log("dismissed") }}
                    action={{
                        label: 'Done!', 
                        onPress: () => {
                             
                        },
                    }}>
                   Room Reserved Successfully!
      </Snackbar>
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
