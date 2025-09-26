import { Colors } from "@/constants/Colors";
import { useCreateServer, useUpdateServer } from "@/hooks/hooks";
import { useAppSelector } from "@/hooks/reduxHooks";
import { ServerType } from "@/types/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Server() {
  const theme = useAppSelector((state) => state.themeSwitcher.theme);
  const { endpoint, port, label } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      endpoint: endpoint == undefined ? "" : endpoint.toString(),
      port: port == undefined ? "" : port.toString(),
      label: label == undefined ? "" : label.toString(),
    },
  });
  const router = useRouter();
  const { useCreate } = useCreateServer();
  const { useUpdate } = useUpdateServer();
  const onSubmit = async (data: ServerType) => {
    if (endpoint == undefined) {
      await useCreate(data);
    } else {
      useUpdate(
        {
          endpoint: endpoint.toString(),
          port: port.toString(),
          label: label.toString(),
        },
        data
      );
    }

    router.push({
      pathname: "/",
      params: data,
    });
  };
  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: Colors[theme].background }}
    >
      {endpoint == undefined ? (
        <AntDesign name="cloud" size={200} color={Colors[theme].themeCross} />
      ) : (
        <MaterialCommunityIcons
          name="cloud-refresh"
          size={200}
          color={Colors[theme].themeCross}
        />
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Server Endpoint URL"
            placeholderTextColor={Colors[theme].themeCross}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{
              ...styles.input,
              borderColor: errors.endpoint
                ? Colors[theme].alert
                : Colors[theme].themeCross,
              color: Colors[theme].themeCross,
              backgroundColor: Colors[theme].secondary,
            }}
          />
        )}
        name="endpoint"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Port"
            placeholderTextColor={Colors[theme].themeCross}
            style={{
              ...styles.input,
              borderColor: errors.port
                ? Colors[theme].alert
                : Colors[theme].themeCross,
              color: Colors[theme].themeCross,
              backgroundColor: Colors[theme].secondary,
            }}
          />
        )}
        name="port"
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Label"
            placeholderTextColor={Colors[theme].themeCross}
            style={{
              ...styles.input,
              borderColor: errors.label
                ? Colors[theme].alert
                : Colors[theme].themeCross,
              color: Colors[theme].themeCross,
              backgroundColor: Colors[theme].secondary,
            }}
          />
        )}
        name="label"
      />
      <TouchableOpacity
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
        style={{
          ...styles.button,
          backgroundColor: !isValid ? "grey" : Colors[theme].themeCross,
        }}
      >
        <Text style={{ ...styles.buttonTitle, color: Colors[theme].theme }}>
          {endpoint == undefined ? ">  Connect" : "Update"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "30%",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: "80%",
    borderRadius: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: { fontWeight: "bold" },
});
