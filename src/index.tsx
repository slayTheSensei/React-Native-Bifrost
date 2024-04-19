import React, { useRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { getBifrostWebView } from './helpers';

interface BifrostProps {
  url: string;
  onMessage?: (message: any) => void;
}

export interface BifrostRef {
  sendMessageToWebView: (message: BifrostMessage) => void;
}

const Bifrost = React.forwardRef<BifrostRef, BifrostProps>((props, ref) => {
  const { url, onMessage } = props;
  const webViewRef = useRef<WebView>(null);

  useImperativeHandle(ref, () => ({
    sendMessageToWebView: (message: BifrostMessage) => {
      if (webViewRef.current) {
        const jsonMessage = JSON.stringify(message);
        webViewRef.current.injectJavaScript(`
          window.postMessage(${jsonMessage}, '*');
        `);
      }
    },
  }));

  const onWebViewError = (syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn('WebView error: ', nativeEvent);
  };

  const onWebViewLoad = (syntheticEvent: any) => {
    console.log('WebView loaded: ', syntheticEvent);
  };

  const onWebViewMessageReceived = (event: any) => {
    const message = JSON.parse(event.nativeEvent.data);
    onMessage && onMessage(message);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onError={onWebViewError}
        onLoad={onWebViewLoad}
        onMessage={onWebViewMessageReceived}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        setWebContentsDebuggingEnabled={true}
        startInLoadingState={true}
        style={styles.webview}
        scrollEnabled={false}
      />
    </View>
  );
});

export default Bifrost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  webview: {
    flex: 1,
  },
});

export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b);
}

interface BifrostMessage {
  type: string;
  data: any;
}

export const sendBifrostMessage = async (message: BifrostMessage) => {
  const webview = await getBifrostWebView();
  if (webview) {
    await webview.postMessage(
      JSON.stringify({
        type: message.type,
        data: message.data,
      })
    );
  }
};
