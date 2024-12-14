```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          const errorData = await response.json(); // Attempt to parse error response for more details
          const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
          throw new Error(errorMessage);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
        Alert.alert('Error', err.message); // Show alert to the user
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>An error occurred: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyComponent;
```