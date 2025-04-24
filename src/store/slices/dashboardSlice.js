import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    highlights: [
        "2 reports pending approval",
        "Team velocity dropped by 15%",
        "New joiner needs onboarding checklist review"
    ],
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        addHighlight(state, action) {
            state.highlights.push(action.payload);
        },
        clearHighlights(state) {
            state.highlights = [];
        }
    },
});

export const { addHighlight, clearHighlights } = dashboardSlice.actions;
export default dashboardSlice.reducer;
