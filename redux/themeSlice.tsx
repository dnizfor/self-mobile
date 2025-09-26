import { createSlice } from "@reduxjs/toolkit";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: Theme.Light,
  },
  reducers: {
    setThemeDark: (state) => {
      state.theme = Theme.Dark;
    },
    setThemeLight: (state) => {
      state.theme = Theme.Light;
    },
  },
});

export const { setThemeDark, setThemeLight } = themeSlice.actions;

export default themeSlice.reducer;
