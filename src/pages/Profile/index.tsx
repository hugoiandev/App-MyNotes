import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../contexts/authContext/auth';

const Profile = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Profile</Text>
      <Button
        onPress={() => {
          signOut();
        }}>
        Sair!
      </Button>
    </View>
  );
};

export default Profile;
