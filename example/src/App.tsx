import * as React from 'react';

import { Button, SafeAreaView, StyleSheet } from 'react-native';
import Bifrost, { type BifrostRef } from 'react-native-bifrost';

export default function App() {
  const bifrostRef = React.useRef<BifrostRef>(null);

  React.useEffect(() => {}, []);

  const handleSendMessage = () => {
    if (bifrostRef.current) {
      bifrostRef.current.sendMessageToWebView({
        type: 'bifrost-message',
        data: 'Hello from The Bifrost!',
      });
    }
  };

  const handleMessageReceived = (message: any) => {
    console.log('Message received from WebView: ', message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Bifrost
        ref={bifrostRef}
        url="http://localhost:19006/"
        onMessage={handleMessageReceived}
      />
      <Button title="Send Message" onPress={handleSendMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
