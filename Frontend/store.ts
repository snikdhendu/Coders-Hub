import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import projectReducer from './features/projectSlice';
import flowchartReducer from './features/flowchartSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    flowchart: flowchartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
