/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TaskRoutes from './src/routes/routes';
import AuthProvider from './src/contexts/authContext/auth';

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          <TaskRoutes />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
};

export default App;
