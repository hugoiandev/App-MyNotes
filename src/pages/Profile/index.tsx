import { View, Text, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import { AuthContext } from '../../contexts/authContext/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const Profile = () => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const { signOut } = useContext(AuthContext);

  const getInfoUser = async () => {
    const storageName = await AsyncStorage.getItem('@name');
    const storageEmail = await AsyncStorage.getItem('@email');
    setName(storageName);
    setEmail(storageEmail);
  };

  useEffect(() => {
    getInfoUser();
  }, []);

  return (
    <View style={styles.profileContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
        <Button
          onPress={() => {
            Alert.alert('Sair', 'Você realmente deseja sair?', [
              {
                text: 'Cancelar',
              },
              {
                text: 'Sair',
                onPress: signOut,
              },
            ]);
          }}
          mode="contained"
          dark
          style={styles.exitButton}>
          Sair!
        </Button>
      </View>
    </View>
  );
};

export default Profile;
