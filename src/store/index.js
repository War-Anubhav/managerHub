import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import teamReducer from './slices/teamSlice';

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        team: teamReducer,
    },
});
