import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './main/main';

export const store = configureStore({
  reducer: {
    main: mainReducer,
  }
})