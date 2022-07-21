import React from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import styles from './styles';
import { useForm, Controller } from 'react-hook-form';

const Login = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: any) => console.log(data);

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
              pattern:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
            }}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                style={styles.passwordInput}
                mode="outlined"
                label="Senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
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
            style={styles.loginButton}
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
            Login
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
