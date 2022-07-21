import { View, Text, Button } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = (): JSX.Element => {
  const removeAccessToken = async () => {
    await AsyncStorage.removeItem('@access_token');
  };

  return (
    <View>
      <Text>Ola mundo!</Text>
      <Button
        onPress={() => {
          removeAccessToken();
          // dispatch(getToken({ email, password }));
        }}
        title="Aperte!"
      />
    </View>
  );
};

export default Home;
