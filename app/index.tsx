import ServerCard from "@/components/ServerCard";
import { Colors } from "@/constants/Colors";
import {
  useChangeTheme,
  useDeleteServer,
  useGetServerList,
} from "@/hooks/hooks";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Theme } from "@/redux/themeSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const theme = useAppSelector((state) => state.themeSwitcher.theme);
  const { serverList, loading, getData } = useGetServerList();
  const { useDelete } = useDeleteServer();
  const router = useRouter();
  const { setTheme } = useChangeTheme();

  useEffect(() => {
    if (serverList.length == 0 && !loading) {
      router.replace("/server");
    }
  }, [loading, serverList]);

  const toggleSwitch = () => {
    if (theme == "light") {
      setTheme(Theme.Dark);
    } else {
      setTheme(Theme.Light);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: Colors[theme].background,
      }}
    >
      <View style={styles.themeBar}>
        {theme == "light" ? (
          <Ionicons name="sunny-sharp" size={24} color="black" />
        ) : (
          <Ionicons name="moon" size={24} color="white" />
        )}

        <Switch
          trackColor={{ false: "#767577", true: "#767577" }}
          thumbColor={theme == "light" ? "black" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={theme == "light"}
        />
      </View>
      <FlatList
        data={serverList}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <ServerCard
            endpoint={item.endpoint}
            port={item.port}
            label={item.label}
            key={index}
            onDelete={() => {
              useDelete({
                port: item.port,
                label: item.label,
                endpoint: item.endpoint,
              });
              getData();
            }}
            onUpdate={() =>
              router.push({
                pathname: "/server",
                params: {
                  port: item.port,
                  label: item.label,
                  endpoint: item.endpoint,
                },
              })
            }
          />
        )}
      />
      <View style={styles.console}>
        <TouchableOpacity
          style={{
            ...styles.consoleButton,
            backgroundColor: theme == "light" ? "black" : "white",
          }}
          onPress={() => router.navigate("/server")}
        >
          <Ionicons
            name="add"
            size={24}
            color={theme == "light" ? "white" : "black"}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  themeBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
  },
  console: {
    position: "absolute",
    right: 30,
    bottom: 50,
  },
  consoleButton: {
    padding: 15,
    borderRadius: 10,
  },
});
