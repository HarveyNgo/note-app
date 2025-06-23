import {configureStore, combineReducers} from '@reduxjs/toolkit';
import notesReducer from '../slices/notesSlice';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [],
};

// Combine Reducers
const rootReducer = combineReducers({
  notes: notesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});
// Persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
