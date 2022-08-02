import React from 'react';
import { View } from 'react-native';
import { Checkbox, Divider, IconButton, List } from 'react-native-paper';
import styles from './styles';

interface ListItemProps {
  _id: string;
  title: string;
  description: string;
  finished?: boolean;
}

const ListItem = ({ _id, title, description, finished }: ListItemProps) => {
  return (
    <>
      <List.Item
        left={() => (
          <Checkbox
            onPress={() => console.log('Checkbox clicado!')}
            uncheckedColor="white"
            status={finished ? 'checked' : 'unchecked'}
          />
        )}
        right={() => (
          <View style={styles.actionButtonContainer}>
            <IconButton icon="delete" color="tomato" />
            <IconButton icon="pencil" color="gray" />
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
