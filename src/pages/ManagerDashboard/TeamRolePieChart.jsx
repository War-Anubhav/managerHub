import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TeamRolePieChart = () => {
    const [roleData, setRoleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://synthetic-sims.s3.us-east-1.amazonaws.com/SIM_Details.json'
                );
                const data = await response.json();

                const totalEffort = {};

                // Team projects effort
                Object.values(data.team_projects).forEach((project) => {
                    Object.entries(project.team_allocations).forEach(([name, info]) => {
                        if (!totalEffort[name]) totalEffort[name] = 0;
                        info.sims.forEach((sim) => {
                            totalEffort[name] += sim.effort_days || 0;
                            if (sim.effort_weeks) totalEffort[name] += sim.effort_weeks * 5;
                        });
                    });
                });

                // KTLO effort
                data.support_activities.ktlo.allocations.forEach((entry) => {
                    const name = entry.assignee;
                    if (!totalEffort[name]) totalEffort[name] = 0;
                    totalEffort[name] += entry.sim.effort_days || 0;
                });

                // Oncall (assume 5 days per 2-week rotation)
                data.support_activities.oncall.rotations.forEach((entry) => {
                    const name = entry.name;
                    if (!totalEffort[name]) totalEffort[name] = 0;
                    totalEffort[name] += 5; // fixed assumption
                });

                // Make sure every known member is accounted for
                const knownMembers = [
                    'Alice Johnson',
                    'Clara Kim',
                    'Bob Lee',
                    'Emily Zhang',
                    'Daniel Reyes'
                ];
                knownMembers.forEach(name => {
                    if (!totalEffort[name]) totalEffort[name] = 0;
                });

                // Categorize into roles based on effort
                const roleCounts = {
                    'SDE-1': 0,
                    'SDE-2': 0,
                    'SDE-3': 0,
                };

                Object.entries(totalEffort).forEach(([name, effort]) => {
                    if (effort <= 60) roleCounts['SDE-1']++;
                    else if (effort <= 90) roleCounts['SDE-2']++;
                    else roleCounts['SDE-3']++;
                });

                const chartData = {
                    labels: Object.keys(roleCounts),
                    datasets: [
                        {
                            label: 'Role Distribution',
                            data: Object.values(roleCounts),
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                };

                setRoleData(chartData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load role data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading role chart...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">Team Role Distribution</h2>
            <Pie data={roleData} />
        </div>
    );
};

export default TeamRolePieChart;
