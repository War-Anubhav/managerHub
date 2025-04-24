// utils/orgData.js

export const getTeamData = () => {
    return {
        manager: {
            name: "Maya Singh",
            title: "Manager",
            email: "maya.singh@example.com"
        },
        reports: [
            {
                name: "Alice Johnson",
                title: "SDE-1",
                email: "alice.johnson@example.com",
                blocked: false
            },
            {
                name: "Bob Lee",
                title: "SDE-2",
                email: "bob.lee@example.com",
                blocked: false
            },
            {
                name: "Clara Kim",
                title: "SDE-1",
                email: "clara.kim@example.com",
                blocked: false
            },
            {
                name: "Daniel Reyes",
                title: "SDE-3",
                email: "daniel.reyes@example.com",
                blocked: false
            },
            {
                name: "Emily Zhang",
                title: "SDE-2",
                email: "emily.zhang@example.com",
                blocked: true
            }
        ]
    };
};

export const getProjectData = () => ({
    projects: [
        {
            name: "System X",
            start_date: "2025-01-01",
            duration_weeks: 8,
            description: "Migrating the Bifrost system to the PRG platform while enhancing and addressing gaps in the current EPR generation process."
        },
        {
            name: "Rembrandt",
            start_date: "2025-01-01",
            duration_weeks: 6,
            description: "An initiative to externalize AGL Transportation APIs."
        },
        {
            name: "Self Invoicing Onboarding",
            start_date: "2025-04-01",
            duration_weeks: 10,
            description: "A user-friendly tool that streamlines self-invoicing onboarding for seamless vendor activation."
        },
        {
            name: "Full CI/CD",
            start_date: "2025-07-01",
            duration_weeks: 12,
            description: "Implementation of an end-to-end Continuous Integration and Deployment pipeline for engineering teams."
        }
    ],
    projectAllocations: [
        {
            name: "Alice Johnson",
            allocations: [
                {
                    project: "System X",
                    bandwidth_percent: 35,
                    duration_weeks: 8,
                    effective_from: "2025-01-01",
                    end_date: "2025-02-26"
                },
                {
                    project: "Self Invoicing Onboarding",
                    bandwidth_percent: 35,
                    duration_weeks: 8,
                    effective_from: "2025-04-01",
                    end_date: "2025-05-26"
                }
            ]
        },
        {
            name: "Bob Lee",
            allocations: [
                {
                    project: "Rembrandt",
                    bandwidth_percent: 40,
                    duration_weeks: 6,
                    effective_from: "2025-01-01",
                    end_date: "2025-02-11"
                },
                {
                    project: "Self Invoicing Onboarding",
                    bandwidth_percent: 30,
                    duration_weeks: 10,
                    effective_from: "2025-04-01",
                    end_date: "2025-06-10"
                }
            ]
        },
        {
            name: "Clara Kim",
            allocations: [
                {
                    project: "System X",
                    bandwidth_percent: 35,
                    duration_weeks: 4,
                    effective_from: "2025-01-01",
                    end_date: "2025-01-28"
                },
                {
                    project: "Self Invoicing Onboarding",
                    bandwidth_percent: 35,
                    duration_weeks: 8,
                    effective_from: "2025-04-01",
                    end_date: "2025-05-26"
                }
            ]
        },
        {
            name: "Daniel Reyes",
            allocations: [
                {
                    project: "Self Invoicing Onboarding",
                    bandwidth_percent: 35,
                    duration_weeks: 8,
                    effective_from: "2025-04-01",
                    end_date: "2025-05-26"
                },
                {
                    project: "Full CI/CD",
                    bandwidth_percent: 35,
                    duration_weeks: 12,
                    effective_from: "2025-07-01",
                    end_date: "2025-09-30"
                }
            ]
        },
        {
            name: "Emily Zhang",
            allocations: [
                {
                    project: "Rembrandt",
                    bandwidth_percent: 35,
                    duration_weeks: 6,
                    effective_from: "2025-01-01",
                    end_date: "2025-02-11"
                },
                {
                    project: "Self Invoicing Onboarding",
                    bandwidth_percent: 35,
                    duration_weeks: 10,
                    effective_from: "2025-04-01",
                    end_date: "2025-06-10"
                }
            ]
        }
    ]
});
