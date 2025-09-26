import { Colors } from "@/constants/Colors";
import { useAppSelector } from "@/hooks/reduxHooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated from "react-native-reanimated";

type ServerCardProps = {
  endpoint: string;
  port: string;
  label: string;
  onDelete: VoidFunction;
  onUpdate: VoidFunction;
};
export default function ServerCard({
  endpoint,
  port,
  label,
  onDelete,
  onUpdate,
}: ServerCardProps) {
  const theme = useAppSelector((state) => state.themeSwitcher.theme);
  function RightAction() {
    return (
      <Reanimated.View style={styles.reanimatedView}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "green" }}
          onPress={onUpdate}
        >
          <MaterialIcons name="settings" size={40} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={{ ...styles.button, backgroundColor: "red" }}
        >
          <MaterialIcons name="delete" size={40} color="white" />
        </TouchableOpacity>
      </Reanimated.View>
    );
  }
  return (
    <ReanimatedSwipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
    >
      <TouchableOpacity
        style={{
          ...styles.container,
          backgroundColor: Colors[theme].secondary,
        }}
        onPress={() =>
          router.push({
            pathname: "/home",
            params: {
              port: port,
              endpoint: endpoint,
            },
          })
        }
      >
        <View style={styles.icon}>
          <AntDesign name="right" size={24} color={Colors[theme].themeCross} />
        </View>
        <View style={styles.content}>
          <Text
            style={{
              ...styles.title,
              color: Colors[theme].themeCross,
            }}
          >
            {label}
          </Text>
          <Text style={styles.subtitle}>
            {endpoint} : {port}
          </Text>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 15,
    flexDirection: "row",
    height: 60,
  },
  icon: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  subtitle: { fontSize: 15, fontWeight: "bold", color: "grey" },
  reanimatedView: {
    width: 130,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
