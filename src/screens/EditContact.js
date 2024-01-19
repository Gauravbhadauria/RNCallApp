import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation, useRoute} from '@react-navigation/native';
const EditContact = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = useState(route.params.data.name);
  const [email, setEmail] = useState(route.params.data.email);
  const [mobile, setMobile] = useState(route.params.data.mobile);
  console.log(route.params.data.id);
  //post
  //get
  //update
  //delete

  const saveContact = () => {
    firestore()
      .collection('contacts')
      .doc(route.params.data.id)
      .update({
        name: name,
        mobile: mobile,
        email: email,
      })
      .then(() => {
        console.log('contact saved');
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={{alignSelf: 'center', marginTop: 50}}>
        <Image
          source={require('../images/user.png')}
          style={{
            width: 80,
            height: 80,
            borderBottomLeftRadius: 40,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          alignSelf: 'center',
          textDecorationLine: 'underline',
          color: 'blue',
          marginTop: 10,
          fontSize: 16,
        }}>
        Edit Image
      </Text>
      <TextInput
        placeholder="Enter Contact Name"
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 40,
          paddingLeft: 15,
        }}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter Mobile"
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 15,
        }}
        keyboardType="number-pad"
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter Contact Email"
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 20,
          paddingLeft: 15,
        }}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TouchableOpacity
        style={{
          width: '90%',
          height: 50,
          backgroundColor: 'black',
          alignSelf: 'center',
          marginTop: 20,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          if (name == '') {
            Alert.alert('Please Enter Name');
          } else {
            if (mobile == '') {
              Alert.alert('Please Enter Mobile');
            } else {
              if (email == '') {
                Alert.alert('Please Enter Email');
              } else {
                saveContact();
              }
            }
          }
        }}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
          Update Contact
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditContact;
