/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { sendBifrostMessage } from 'react-native-bifrost';

export default function App() {
  const [message, setMessage] = React.useState<string>('');

  async function requestCameraAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Use the stream object to access the camera
      // For example, you can attach it to a video element:
      // const videoElement = document.getElementById('video');
      // videoElement.srcObject = stream;
      return true;
    } catch (error) {
      console.error('Failed to request camera access:', error);
      return false;
    }
  }

  async function requestMicrophoneAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Use the stream object to access the microphone
      return true;
    } catch (error) {
      console.error('Failed to request microphone access:', error);
      return false;
    }
  }

  React.useEffect(() => {
    const w = window as any;

    w.addEventListener('message', async function (event: any) {
      // Handle the received message
      const message = event.data;

      if (message.type === 'bifrost-message') {
        setMessage(message.data);

        setTimeout(() => {
          setMessage('');
        }, 2000);
        return;
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button
        title="Send Message to Mobile"
        onPress={() =>
          sendBifrostMessage({
            type: 'microfrontend-message',
            data: 'Hello from Web!',
          })
        }
      />
      <View style={{ marginVertical: 10 }}>
        <Button title="Request Camera Access" onPress={requestCameraAccess} />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Button title="Request Mic Access" onPress={requestMicrophoneAccess} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { height: 20, marginBottom: 10 },
});
