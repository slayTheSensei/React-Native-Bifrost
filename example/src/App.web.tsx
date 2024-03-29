import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { sendBifrostMessage } from 'react-native-bifrost';

export default function App() {
  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    const w = window as any;

    w.addEventListener('message', async function (event: any) {
      // Handle the received message
      const message = event.data;
      console.log('Message received from Bifrost', message);

      if (message.type === 'bifrost-message') {
        setMessage(message.data);
        return;
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {message}</Text>
      <Button
        title="Send Message"
        onPress={() =>
          sendBifrostMessage({
            type: 'microfrontend-message',
            data: 'Hello from Microfrontend!',
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
