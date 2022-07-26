import { View, Text, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext/auth';

const Home = (): JSX.Element => {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Ola mundo!</Text>
      <Button
        onPress={() => {
          signOut();
        }}
        title="Aperte!"
      />
    </View>
  );
};

export default Home;
