import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerTitle: {
    marginBottom: 60,
  },
  loginTitle: {
    fontSize: 50,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  emailInput: {
    marginBottom: 10,
  },
  passwordInput: {
    marginTop: 5,
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 5,
  },
  registerButton: {
    marginTop: 5,
  },
});

export default styles;
