import { ScrollView } from 'react-native';
import { ActivityIndicator, List } from 'react-native-paper';
import React, { useContext, useEffect } from 'react';
import Container from '../../components/Container';
import { TasksContext } from '../../contexts/tasksContext';

const Home = (): JSX.Element => {
  const { getTasks, tasksState } = useContext(TasksContext);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <Container>
      <ScrollView>
        <List.Section>
          {tasksState.loading ? (
            <ActivityIndicator />
          ) : (
            tasksState.tasks.map(({ _id, name, description }) => {
              return (
                <List.Item key={_id} title={name} description={description} />
              );
            })
          )}
        </List.Section>
      </ScrollView>
    </Container>
  );
};

export default Home;
