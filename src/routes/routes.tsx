import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/authContext/auth';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

const TaskRoutes = (): JSX.Element => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </>
  );
};

export default TaskRoutes;
