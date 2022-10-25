import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [text, setText] = useState({});
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(null);
  const [deleted, setDeleted] = useState([]);

  function inputHandler(inputText) {
    setText(inputText);
  }

  function saveInputHandler() {
    const UID = new Date().getTime() + Math.random().toString(36);

    if (text.length > 0 && !edit) {
      setTasks(currentTasks => [...currentTasks, { key: UID, value: text }]);
      setText('');
    }

    if (text.length > 0 && edit) {
      console.log(text, edit);
      setTasks(currentTasks => {
        const index = currentTasks.findIndex(task => task.key === edit.key);
        currentTasks[index].value = text;
        return currentTasks;
      });
      setEdit(null);
      setText('');
    }


  }

  function deleteTaskHandler(selected) {
    if (edit) return null;
    setTasks(currentTasks => {
      return currentTasks.filter((current) => current.key !== selected.key);
    });
    setDeleted(currentDeleted => [...currentDeleted, selected]);
  }

  function undoDeleteHandler(selected) {
    setTasks(currentTasks => [...currentTasks, selected]);
    setDeleted(currentDeleted => {
      return currentDeleted.filter((current) => current.key !== selected.key);
    })
  }

  function updateTaskHandler(selected) {
    setEdit(selected)
    setText(selected.value);
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Add your task'
          onChangeText={inputHandler}
          value={text}
        />
        <Button
          title={edit ? 'Update' : 'Add'}
          onPress={saveInputHandler}
        />
      </View>
      <View style={styles.tasksContainer}>
        <FlatList
          data={tasks}
          renderItem={task => {
            return <View style={styles.taskContainer}>
              <Text style={styles.text}>{task.item.value}</Text>
              <Button title='Complete' onPress={() => deleteTaskHandler(task.item)} />
              <Button title='Update' onPress={() => updateTaskHandler(task.item)} />
            </View>
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tasksContainer: {
    marginVertical: 32,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    color: 'black',
    borderWkeyth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWkeyth: 1,
    borderColor: '#cccccc',
    wkeyth: '75%',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});


/*

        {deleted.map((task) => <View style={styles.taskContainer}>
            <Text style={styles.text} key={task.key}>{task.value}</Text>
            <Button title='Undo' onPress={() => undoDeleteHandler(task)} />
          </View>)}

          */