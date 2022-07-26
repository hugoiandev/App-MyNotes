import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../contexts/authContext/auth';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Done from '../pages/Done';

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
        <Drawer.Navigator initialRouteName="Tarefas a fazer">
          <Drawer.Screen name="Tarefas a fazer" component={Home} />
          <Drawer.Screen name="Concluidas" component={Done} />
          <Drawer.Screen name="Perfil" component={Profile} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Entrar">
          <Stack.Screen name="Entrar" component={Login} />
          <Stack.Screen name="Registrar" component={Register} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default TaskRoutes;
