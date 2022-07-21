import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  containerTitle: {
    marginBottom: 80,
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
});

export default styles;
