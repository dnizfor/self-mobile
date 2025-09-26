import { setThemeDark, setThemeLight, Theme } from "@/redux/themeSlice";
import { ServerType } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./reduxHooks";

export function useGetServerList() {
  const [serverList, setServerList] = useState<ServerType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem("serverList");
      if (value !== null) {
        const data = JSON.parse(value);
        setServerList(data);
      }
    } catch (e) {
      // error reading value
    }
    setLoading(false);
  };
  return { serverList, loading, getData };
}
export function useDeleteServer() {
  const { serverList } = useGetServerList();

  const useDelete = (server: ServerType) => {
    const selectedIndex = serverList.findIndex(
      (data) =>
        data.endpoint == server.endpoint &&
        data.label == server.label &&
        data.port == server.port
    );
    const updatedList = serverList.filter((_, i) => i !== selectedIndex);
    storeData(updatedList);
  };

  const storeData = async (value: ServerType[]) => {
    const stringValue = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("serverList", stringValue);
    } catch (e) {
      // saving error
    }
  };

  return { useDelete };
}

export function useCreateServer() {
  const { serverList } = useGetServerList();
  const [updatedServerList, setUpdatedServerList] = useState<ServerType[]>([]);

  // Store list in AsyncStorage
  const storeData = async (value: ServerType[]) => {
    try {
      await AsyncStorage.setItem("serverList", JSON.stringify(value));
    } catch (e) {
      console.error("Error saving server list:", e);
    }
  };

  // The external function that will add a server
  const useCreate = async (newServer: ServerType) => {
    if (!newServer) return;

    const exists = serverList.some(
      (s) =>
        s.endpoint === newServer.endpoint &&
        s.label === newServer.label &&
        s.port === newServer.port
    );

    if (!exists) {
      const updatedList = [...serverList, newServer];
      setUpdatedServerList(updatedList);
      await storeData(updatedList);
      return updatedList;
    } else {
      return serverList;
    }
  };

  // Keep updatedServerList in sync with AsyncStorage
  useEffect(() => {
    setUpdatedServerList(serverList);
  }, [serverList]);

  return { updatedServerList, useCreate };
}

export function useUpdateServer() {
  const { serverList } = useGetServerList();
  const [newServerList, setNewServerList] = useState<ServerType[]>(
    serverList || []
  );

  const storeData = async (value: ServerType[]) => {
    try {
      await AsyncStorage.setItem("serverList", JSON.stringify(value));
    } catch (e) {
      console.error("Error saving server list:", e);
    }
  };

  const useUpdate = (oldServer: ServerType, newServer: ServerType) => {
    if (!serverList) return;

    const index = serverList.findIndex(
      (s) =>
        s.endpoint === oldServer.endpoint &&
        s.label === oldServer.label &&
        s.port === oldServer.port
    );

    if (index !== -1) {
      const updatedList = [...serverList];
      updatedList[index] = newServer;

      setNewServerList(updatedList);
      storeData(updatedList);
    }
  };

  return { useUpdate };
}

export function useChangeTheme() {
  const dispatch = useAppDispatch();
  async function setTheme(newTheme: Theme) {
    if (newTheme == "dark") {
      dispatch(setThemeDark());
      try {
        await AsyncStorage.setItem("theme", "dark");
      } catch (e) {
        console.error("Error saving server list:", e);
      }
    } else {
      dispatch(setThemeLight());

      try {
        await AsyncStorage.setItem("theme", "light");
      } catch (e) {
        console.error("Error saving server list:", e);
      }
    }
  }
  return { setTheme };
}

export function useLoadTheme() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");

        if (savedTheme === "dark") {
          dispatch(setThemeDark());
        } else {
          // Default light olsun
          dispatch(setThemeLight());
        }
      } catch (e) {
        console.error("Error loading theme:", e);
        // hata olursa fallback olarak light
        dispatch(setThemeLight());
      }
    }

    loadTheme();
  }, [dispatch]);
}
