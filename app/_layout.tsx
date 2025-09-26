import { useLoadTheme } from "@/hooks/hooks";
import store from "@/redux/store";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <Initializer />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Provider>
    </GestureHandlerRootView>
  );
}
function Initializer() {
  useLoadTheme();
  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return null;
}
