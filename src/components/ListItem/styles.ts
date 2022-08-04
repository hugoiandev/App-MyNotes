import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 25,
  },
  descriptionStyle: {
    fontSize: 15,
  },
  actionButtonContainer: {
    flexDirection: 'row',
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
  modalEditButton: {
    paddingVertical: 5,
  },
});

export default styles;
