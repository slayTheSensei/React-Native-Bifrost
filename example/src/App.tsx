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
        <>
          <View style={styles.labelContainer}>
            <Text style={{ color: 'white' }}>Mobile</Text>
          </View>

          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Text style={{ height: 20, marginBottom: 10, alignSelf: 'center' }}>
              {message}
            </Text>
            <View style={{ backgroundColor: 'darkgrey', alignItems: 'center' }}>
              <Button
                color={'white'}
                title="Send Message to Web"
                onPress={handleSendMessage}
              />
            </View>
          </View>
        </>
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
    flex: 2,
    width: '100%',
  },
  mobile: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'lightgray',
  },
  labelContainer: {
    backgroundColor: 'black',
    width: 60,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
    padding: 3,
  },
});
