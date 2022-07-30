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
import { Provider } from 'react-native-paper';
import TaskRoutes from './src/routes/routes';
import AuthProvider from './src/contexts/authContext/auth';
import styles from './styles/styles';

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer>
        <AuthProvider>
          <Provider>
            <TaskRoutes />
          </Provider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
