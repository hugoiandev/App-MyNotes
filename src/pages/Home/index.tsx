import { ScrollView } from 'react-native';
import {
  ActivityIndicator,
  Button,
  FAB,
  HelperText,
  List,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import React, { useContext, useEffect, useState } from 'react';
import Container from '../../components/Container';
import { TasksContext } from '../../contexts/tasksContext';
import ListItem from '../../components/ListItem';
import styles from './styles';
import { Controller, useForm } from 'react-hook-form';

const Home = (): JSX.Element => {
  const [modalVisibleState, setModalVisibleState] = useState<boolean>(false);
  const { getTasks, getTasksState, newTask, newTaskState } =
    useContext(TasksContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <Portal>
        <Modal
          onDismiss={() => setModalVisibleState(false)}
          visible={modalVisibleState}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.titleModal}>Criar tarefa</Text>
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
              newTask({ name: data.title, description: data.description }),
            )}
            style={styles.modalCreateButton}
            mode="contained">
            {newTaskState.loading ? (
              <ActivityIndicator color="white" />
            ) : (
              'Criar'
            )}
          </Button>
        </Modal>
      </Portal>
      <Container>
        <ScrollView>
          <List.Section>
            {getTasksState.loading ? (
              <ActivityIndicator />
            ) : (
              getTasksState.tasks.map(
                ({ _id, name, description, finished }) => {
                  if (!finished) {
                    return (
                      <ListItem
                        key={_id}
                        _id={_id}
                        title={name}
                        description={description}
                        finished={finished}
                      />
                    );
                  }
                },
              )
            )}
          </List.Section>
        </ScrollView>
        <FAB
          onPress={() => setModalVisibleState(true)}
          color="white"
          style={styles.floatButton}
          icon="plus"
        />
      </Container>
    </>
  );
};

export default Home;
