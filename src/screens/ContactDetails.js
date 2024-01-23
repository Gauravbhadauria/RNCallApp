import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
const AddContact = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getData();
  }, [isFocused]);
  const getData = () => {
    firestore()
      .collection('contacts')
      .doc(route.params.data.id)
      .get()
      .then(snapshot => {
        setUserInfo(snapshot.data());
        console.log('data==>', snapshot.data());
      });
  };
  const deteleteContact = () => {
    firestore()
      .collection('contacts')
      .doc(route.params.data.id)
      .delete()
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity style={{alignSelf: 'center', marginTop: 50}}>
        {userInfo != null && userInfo.image ? (
          <Image
            source={{uri: userInfo.image}}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
        ) : (
          <Image
            source={require('../images/user.png')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
        )}
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 25,
          alignSelf: 'center',
          fontWeight: '600',
          marginTop: 10,
        }}>
        {userInfo ? userInfo.name : ''}
      </Text>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: 50,
          marginTop: 20,
        }}>
        <Text style={{fontSize: 20}}>{'Contact:'}</Text>
        <Text style={{fontSize: 20, fontWeight: '500'}}>
          {userInfo ? userInfo.mobile : ''}
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          height: 50,
        }}>
        <Text style={{fontSize: 20}}>{'Email:'}</Text>
        <Text style={{fontSize: 20, fontWeight: '500'}}>
          {userInfo ? userInfo.email : ''}
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          position: 'absolute',
          bottom: 30,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('EditContact', {data: route.params.data});
          }}>
          <Text>Edit Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 50,
            borderWidth: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'red',
          }}
          onPress={() => {
            deteleteContact();
          }}>
          <Text style={{color: 'red'}}>Delete Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddContact;
