import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['uploadManager.uploads'],
        ignoredActionPaths: ['payload.file']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
