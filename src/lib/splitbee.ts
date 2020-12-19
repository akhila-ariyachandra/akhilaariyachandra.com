declare global {
  interface Window {
    splitbee: {
      track: (type: string, data?: any) => void;
    };
  }
}

export const trackEvent = (type: string, data?: any) => {
  window.splitbee.track(type, data);
};
