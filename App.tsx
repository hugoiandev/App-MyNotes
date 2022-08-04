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
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import TaskRoutes from './src/routes/routes';
import AuthProvider from './src/contexts/authContext/auth';
import TasksProvider from './src/contexts/tasksContext';
import styles from './styles/styles';

const theme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: '#d16666',
    text: '#2c4251',
  },
};

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer theme={theme}>
        <AuthProvider>
          <TasksProvider>
            <PaperProvider theme={theme}>
              <TaskRoutes />
            </PaperProvider>
          </TasksProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
