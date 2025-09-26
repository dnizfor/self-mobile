import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
export default function Home() {
  const { endpoint, port } = useLocalSearchParams();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: `${endpoint}:${port}` }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
}
