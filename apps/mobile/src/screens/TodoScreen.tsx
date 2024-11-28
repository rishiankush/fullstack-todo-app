import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, List, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchTodos, addTodo, updateTodo} from '../services/api';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../hooks/AuthContext';

export default function TodoScreen() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const {state, dispatch} = useAuth();

  const loadTodos = async () => {
    try {
      const data = await fetchTodos(state.token!);
      setTodos(data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
        Alert.alert('Session Expired', 'Please log in again.');
      } else {
        console.log('Error', 'Failed to load todos.');
      }
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      Alert.alert('Validation Error', 'Todo cannot be empty.');
      return;
    }
    try {
      const todo = await addTodo(newTodo, state.token!);
      setTodos([...todos, todo]);
      setNewTodo('');
    } catch (error) {
      console.log('error ***** ', error);
      Alert.alert('Error', 'Failed to add todo.');
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      await updateTodo(id, completed, state.token!);
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === id ? {...todo, completed} : todo)),
      );
    } catch (error) {
      console.log('Error updating todo:', error);
      Alert.alert('Error', 'Failed to update todo.');
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'LOGOUT'});
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Todos</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        label="Add a New Todo"
        value={newTodo}
        onChangeText={setNewTodo}
        mode="outlined"
        style={styles.input}
        placeholder="What do you need to do?"
      />
      <Button mode="contained" onPress={handleAddTodo} style={styles.button}>
        Add Todo
      </Button>
      <FlatList
        data={todos}
        keyExtractor={(item: any) => item.id}
        renderItem={({item}: any) => (
          <List.Item
            title={item.title}
            description={item.completed ? 'Completed' : 'Pending'}
            onPress={() => handleToggleTodo(item.id, !item.completed)}
            left={props => (
              <List.Icon
                {...props}
                icon={item.completed ? 'check-circle' : 'circle-outline'}
              />
            )}
          />
        )}
        ListEmptyComponent={<Title style={styles.emptyText}>No Todos</Title>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logout: {
    color: 'red',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 15,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#888',
  },
});
