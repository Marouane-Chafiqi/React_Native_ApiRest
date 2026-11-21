import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error('Erreur HTTP ' + res.status);
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError('Impossible de charger les utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Écran de détails
  if (selectedUser) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{selectedUser.name}</Text>
          <Text style={styles.email}>{selectedUser.email}</Text>
          <Text style={styles.detail}>Username : {selectedUser.username}</Text>
          <Text style={styles.detail}>Téléphone : {selectedUser.phone}</Text>
          <Text style={styles.detail}>Ville : {selectedUser.address?.city}</Text>
          <Text style={styles.detail}>Société : {selectedUser.company?.name}</Text>
        </View>
        <Button title="Retour" onPress={() => setSelectedUser(null)} />
      </View>
    );
  }

  // Écran liste
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utilisateurs</Text>

      <TextInput
        placeholder="Rechercher un utilisateur..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.input}
      />

      <Button title="Actualiser" onPress={fetchUsers} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Chargement des utilisateurs...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Button title="Réessayer" onPress={fetchUsers} />
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.empty}>Aucun résultat</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => setSelectedUser(item)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  email: { fontSize: 14, color: '#666' },
  detail: { fontSize: 15, marginTop: 6 },
  error: { color: 'red', fontSize: 16, marginBottom: 10 },
  empty: { textAlign: 'center', marginTop: 20, color: '#666' },
});
