import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  registerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerTitle: {
    marginBottom: 60,
  },
  registerTitle: {
    fontSize: 50,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  lastNameInput: {
    marginTop: 10,
  },
  emailInput: {
    marginTop: 10,
  },
  passwordInput: {
    marginTop: 10,
  },
  registerButton: {
    marginTop: 15,
    paddingVertical: 5,
  },
});

export default styles;
