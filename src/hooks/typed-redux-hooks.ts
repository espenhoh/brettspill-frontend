import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "../store/index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useBSDispatch = useDispatch.withTypes<AppDispatch>();
export const useBSSelector = useSelector.withTypes<RootState>();
export const useBSStore = useStore.withTypes<AppStore>();
