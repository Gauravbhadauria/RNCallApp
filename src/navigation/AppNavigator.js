import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Contacts from '../screens/Contacts';
import AddContact from '../screens/AddContact';
import EditContact from '../screens/EditContact';
import ContactDetails from '../screens/ContactDetails';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="AddContact" component={AddContact} />
        <Stack.Screen name="EditContact" component={EditContact} />
        <Stack.Screen name="ContactDetails" component={ContactDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
