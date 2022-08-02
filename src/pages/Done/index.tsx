import { ScrollView } from 'react-native';
import React, { useContext } from 'react';
import Container from '../../components/Container';
import { ActivityIndicator, List } from 'react-native-paper';
import ListItem from '../../components/ListItem';
import { TasksContext } from '../../contexts/tasksContext';

const Done = () => {
  const { tasksState } = useContext(TasksContext);

  return (
    <Container>
      <ScrollView>
        <List.Section>
          {tasksState.loading ? (
            <ActivityIndicator />
          ) : (
            tasksState.tasks.map(({ _id, name, description, finished }) => {
              if (finished) {
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
            })
          )}
        </List.Section>
      </ScrollView>
    </Container>
  );
};

export default Done;
