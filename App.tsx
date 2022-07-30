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
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import TaskRoutes from './src/routes/routes';
import AuthProvider from './src/contexts/authContext/auth';
import styles from './styles/styles';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const App = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationContainer>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <TaskRoutes />
          </PaperProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
