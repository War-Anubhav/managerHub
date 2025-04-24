// store/slices/teamSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { getTeamData, getProjectData } from '../../utils/orgData';

const initialState = {
    manager: null,
    reports: [],
    projects: [],
    projectAllocations: [],
    memberSummaries: {
        "emily.zhang@example.com": {
            "2025-02": {
                name: "Emily Zhang",
                short_summary: "Blocked on Address Validation API.",
                email_count: 3,
                last_updated: "2025-02",
                work_summary: "...",
                weekly_status: "...",
                blockers: "...",
                achievements: "...",
                working_backward: "..."
            }
        }
    }
};

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        loadTeamData: (state) => {
            const { manager, reports } = getTeamData();
            const { projects, projectAllocations } = getProjectData();
            state.manager = manager;
            state.reports = reports;
            state.projects = projects;
            state.projectAllocations = projectAllocations;
        },
    },
});

export const { loadTeamData } = teamSlice.actions;
export default teamSlice.reducer;
