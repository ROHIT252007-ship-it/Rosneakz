
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import { useAppTheme } from '../../../shared/hooks/theme';

type Props = {
  modelUrl: string;
};
// const theme=useAppTheme();
const Shoe3DViewer = ({modelUrl}: Props) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
  <style>
    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      background: #ffffff;
      overflow: hidden;
    }
    model-viewer {
      width: 100%;
      height: 100%;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <model-viewer
    src="${modelUrl}"
    camera-controls
    auto-rotate
    shadow-intensity="1"
    exposure="1"
    environment-image="neutral">
  </model-viewer>
</body>
</html>
`;

  return (
    <View style={[styles.container]}>
      <WebView
        source={{html}}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={['*']}
        mixedContentMode="always"
        allowsFullscreenVideo
      />
    </View>
  );
};

export default Shoe3DViewer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 380,
    overflow: 'hidden',
  },
});