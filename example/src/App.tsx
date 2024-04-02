/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';

import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Bifrost, { type BifrostRef } from 'react-native-bifrost';

export default function App() {
  const bifrostRef = React.useRef<BifrostRef>(null);
  const [message, setMessage] = React.useState<string>('');
  const [_webMessage, setWebMessage] = React.useState<string>('');

  React.useEffect(() => {}, []);

  const handleSendMessage = () => {
    if (bifrostRef.current) {
      bifrostRef.current.sendMessageToWebView({
        type: 'bifrost-message',
        data: 'Hello from Mobile!',
      });
      setWebMessage('');
    }
  };

  const handleMessageReceived = (message: any) => {
    setMessage(message.data);
    setTimeout(() => {
      setMessage('');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.web}>
        <Bifrost
          ref={bifrostRef}
          url="http://localhost:19006/"
          onMessage={handleMessageReceived}
        />
      </View>
      <View style={styles.mobile}>
        <Text style={{ height: 20, marginBottom: 10 }}>{message}</Text>
        <View style={{ backgroundColor: 'darkgrey' }}>
          <Button
            color={'white'}
            title="Send Message to Web"
            onPress={handleSendMessage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  web: {
    flex: 1,
    width: '100%',
  },
  mobile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'lightgray',
  },
});
