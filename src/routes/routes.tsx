import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../contexts/authContext/auth';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TaskRoutes = (): JSX.Element => {
  const { authValidate, authState } = useContext(AuthContext);

  useEffect(() => {
    authValidate();
  }, [authValidate]);

  return (
    <>
      {authState.loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      ) : authState.isAuthenticated ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default TaskRoutes;
