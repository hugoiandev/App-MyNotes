import { View, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import styles from './styles';
import {
  ActivityIndicator,
  Button,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../contexts/authContext/auth';

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const { signUp, signUpState } = useContext(AuthContext);

  return (
    <View style={styles.registerContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View>
          <View style={styles.containerTitle}>
            <Text style={styles.registerTitle}>MyNotes</Text>
          </View>
          <Controller
            name="firstName"
            control={control}
            rules={{ min: 3, required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                mode="outlined"
                label="Nome"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.firstName ? true : false}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={{ min: 5, required: true }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                mode="outlined"
                label="Sobrenome"
                style={styles.lastNameInput}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.lastName ? true : false}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern:
                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                mode="outlined"
                label="Email"
                style={styles.emailInput}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email ? true : false}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              pattern:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                mode="outlined"
                label="Senha"
                style={styles.passwordInput}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password ? true : false}
                secureTextEntry={true}
              />
            )}
          />
          {errors.password && (
            <>
              <HelperText type="error">8 caracteres no mínimo.</HelperText>
              <HelperText type="error">1 Letra Maiúscula no mínimo.</HelperText>
              <HelperText type="error">1 Número no mínimo.</HelperText>
              <HelperText type="error">1 Símbolo no mínimo: $*&@#.</HelperText>
            </>
          )}
          <Button
            mode="contained"
            style={styles.registerButton}
            onPress={handleSubmit(signUp)}
            disabled={signUpState.loading}>
            {signUpState.loading ? <ActivityIndicator /> : 'Cadastrar'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
