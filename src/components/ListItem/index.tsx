import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Alert, View } from 'react-native';
import {
  Divider,
  IconButton,
  List,
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  HelperText,
  ActivityIndicator,
} from 'react-native-paper';
import { TasksContext } from '../../contexts/tasksContext';
import styles from './styles';

interface ListItemProps {
  _id: string;
  title: string;
  description: string;
  finished?: boolean;
}

const ListItem = ({ _id, title, description, finished }: ListItemProps) => {
  const [modalVisibleState, setModalVisibleState] = useState<boolean>(false);
  const { updateStatusTask, deleteTask, updateTask, updateTaskState } =
    useContext(TasksContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      description: description,
    },
  });

  const modalDelete = () => {
    Alert.alert('Deletar', 'Você deseja apagar esta tarefa', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Deletar',
        onPress: () => deleteTask(_id),
      },
    ]);
  };

  return (
    <>
      <Portal>
        <Modal
          visible={modalVisibleState}
          onDismiss={() => setModalVisibleState(false)}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.titleModal}>Editar tarefa</Text>
          <Controller
            control={control}
            name="title"
            rules={{ min: 5, required: true }}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <TextInput
                  mode="outlined"
                  label="Titulo"
                  style={styles.modalTitleInput}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.title ? true : false}
                />
              );
            }}
          />
          {errors.title && (
            <HelperText type="error">No minimo 5 caracteres.</HelperText>
          )}
          <Controller
            control={control}
            name="description"
            rules={{ min: 10, required: true }}
            render={({ field: { value, onChange, onBlur } }) => {
              return (
                <TextInput
                  mode="outlined"
                  label="Descrição"
                  style={styles.modalDescriptionInput}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.description ? true : false}
                />
              );
            }}
          />
          {errors.description && (
            <HelperText type="error">No minimo 10 caracteres.</HelperText>
          )}
          <Button
            dark
            onPress={handleSubmit(data =>
              updateTask(_id, {
                name: data.title,
                description: data.description,
              }),
            )}
            disabled={updateTaskState.loading}
            style={styles.modalEditButton}
            mode="contained">
            {updateTaskState.loading ? <ActivityIndicator /> : 'Editar'}
          </Button>
        </Modal>
      </Portal>
      <List.Item
        right={() => (
          <View style={styles.actionButtonContainer}>
            <IconButton onPress={modalDelete} icon="delete" color="tomato" />
            <IconButton
              onPress={() => setModalVisibleState(true)}
              icon="pencil"
              color="gray"
            />
            <IconButton
              onPress={() => updateStatusTask(_id)}
              icon={finished ? 'close' : 'check'}
              color={finished ? '#bbbe1d' : '#2bb93c'}
            />
          </View>
        )}
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
        descriptionStyle={styles.descriptionStyle}
      />
      <Divider />
    </>
  );
};

export default ListItem;
