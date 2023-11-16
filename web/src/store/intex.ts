import { configureStore } from "@reduxjs/toolkit";

import { useSelector, TypedUseSelectorHook } from "react-redux";
import { Token } from "./slices/AuthToken";

export const store = configureStore({
  reducer: {
    AuthToken: Token,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
