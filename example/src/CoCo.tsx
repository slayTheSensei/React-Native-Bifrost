import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CoCo = () => {
  return (
    <View style={styles.container}>
      <Text>CoCo</Text>
    </View>
  );
};

export default CoCo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});
