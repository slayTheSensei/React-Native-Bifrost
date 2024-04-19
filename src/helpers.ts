export interface BifrostWebView {
  postMessage: (message: any) => void;
  addEventListener: (type: string, listener: (event: any) => void) => void;
}

export interface BifrostWindow {
  ReactNativeWebView: BifrostWebView;
}

export interface BifrostMessage {
  type: string;
  payload: any;
  metadata?: Record<string, any>;
}

// export const getBifrostWebView = () => {
//   const w = window as unknown as BifrostWindow;
//   return w.ReactNativeWebView;
// };
