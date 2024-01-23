import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
const Contacts = () => {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getContacts();
  }, [isFocused]);
  const getContacts = () => {
    firestore()
      .collection('contacts')
      .get()
      .then(snapshot => {
        let temp = [];
        snapshot.docs.forEach(item => {
          temp.push({...item.data(), id: item.id});
          console.log(item.data(), item.id);
        });
        setContacts(temp);
      });
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={contacts}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '90%',
                height: 70,
                backgroundColor: 'white',
                marginTop: 10,
                alignSelf: 'center',
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                justifyContent: 'space-between',
              }}
              onPress={() => {
                navigation.navigate('ContactDetails', {
                  data: item,
                });
              }}>
              <View style={{flexDirection: 'row'}}>
                {item.image ? (
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                ) : (
                  <Image
                    source={require('../images/user.png')}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                    }}
                  />
                )}
                <View style={{marginLeft: 15}}>
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 14}}>{item.mobile}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${'+91' + item.mobile}`);
                }}>
                <Image
                  source={require('../images/call.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'black',
          position: 'absolute',
          right: 20,
          bottom: 30,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddContact');
        }}>
        <Text style={{color: 'white', fontSize: 30}}>{'+'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
