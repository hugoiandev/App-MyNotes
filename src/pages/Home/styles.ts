import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#d16666',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  titleModal: {
    fontSize: 25,
    marginBottom: 15,
  },
  modalTitleInput: {
    marginBottom: 10,
  },
  modalDescriptionInput: {
    marginBottom: 20,
  },
  modalCreateButton: {
    paddingVertical: 5,
  },
});

export default styles;
