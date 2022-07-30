import React, { useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import {
  TextInput,
  Button,
  Text,
  HelperText,
  ActivityIndicator,
} from 'react-native-paper';
import styles from './styles';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../contexts/authContext/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface LoginProps {
  navigation: NativeStackNavigationProp<any>;
}

const Login = ({ navigation }: LoginProps): JSX.Element => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn, signInState, signUpState } = useContext(AuthContext);

  useEffect(() => {
    if (signUpState.email) {
      setValue('email', signUpState.email);
    }
  }, [setValue, signUpState.email]);

  return (
    <View style={styles.loginContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <View style={styles.containerTitle}>
            <Text style={styles.loginTitle}>MyNotes</Text>
          </View>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
            }}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={styles.emailInput}
                mode="outlined"
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email ? true : false}
              />
            )}
          />
          {errors.email && (
            <HelperText type="error">Email inválido.</HelperText>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={styles.passwordInput}
                mode="outlined"
                label="Senha"
                secureTextEntry={true}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password ? true : false}
              />
            )}
          />
          {errors.password && (
            <HelperText type="error">Campo obrigatório.</HelperText>
          )}
          <Button
            style={styles.loginButton}
            mode="contained"
            onPress={handleSubmit(signIn)}
            disabled={signInState.loading}>
            {signInState.loading ? <ActivityIndicator /> : 'Login'}
          </Button>
          <Button
            onPress={() => navigation.navigate('Register')}
            style={styles.registerButton}>
            Registrar
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
