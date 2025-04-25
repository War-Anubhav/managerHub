import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { getTeamData } from '../../utils/orgData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SDEAllocationByRole = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://synthetic-sims.s3.us-east-1.amazonaws.com/SIM_Details.json'
                );
                const simData = await response.json();
                const teamData = getTeamData();

                const nameToRole = {};
                teamData.reports.forEach(member => {
                    nameToRole[member.name] = member.title; // e.g., SDE-1, SDE-2
                });

                const projectBandwidth = {};

                // Team projects
                Object.entries(simData.team_projects).forEach(([_, project]) => {
                    const projectName = project.name;
                    if (!projectBandwidth[projectName]) projectBandwidth[projectName] = {};

                    Object.entries(project.team_allocations).forEach(([person, val]) => {
                        const role = nameToRole[person];
                        if (!role) return;
                        if (!projectBandwidth[projectName][role]) projectBandwidth[projectName][role] = 0;
                        projectBandwidth[projectName][role] += val.bandwidth_percent;
                    });
                });

                // KTLO Support
                simData.support_activities.ktlo.allocations.forEach((entry) => {
                    const projectName = 'KTLO Support';
                    const role = nameToRole[entry.assignee];
                    if (!role) return;
                    if (!projectBandwidth[projectName]) projectBandwidth[projectName] = {};
                    if (!projectBandwidth[projectName][role]) projectBandwidth[projectName][role] = 0;
                    projectBandwidth[projectName][role] += entry.bandwidth_percent;
                });

                const projects = Object.keys(projectBandwidth);
                const allRoles = Array.from(
                    new Set(projects.flatMap((proj) => Object.keys(projectBandwidth[proj])))
                );

                // Normalize to ensure total bandwidth per project does not exceed 100
                projects.forEach((project) => {
                    const total = Object.values(projectBandwidth[project]).reduce((a, b) => a + b, 0);
                    if (total > 100) {
                        const factor = 100 / total;
                        Object.keys(projectBandwidth[project]).forEach((role) => {
                            projectBandwidth[project][role] = parseFloat((projectBandwidth[project][role] * factor).toFixed(2));
                        });
                    }
                });

                const colorPalette = [
                    '#93C5FD', // Light Blue
                    '#A5B4FC', // Soft Indigo
                    '#FBCFE8', // Light Pink
                    '#D8B4FE', // Soft Violet
                    '#C4B5FD', // Lavender
                    '#FDE68A', // Soft Amber
                    '#A7F3D0', // Mint
                    '#FCA5A5', // Soft Red
                    '#6EE7B7'  // Pastel Green
                ];

                const datasets = allRoles.map((role, idx) => {
                    return {
                        label: role,
                        data: projects.map(
                            (proj) => projectBandwidth[proj][role] || 0
                        ),
                        backgroundColor: colorPalette[idx % colorPalette.length],
                        stack: 'Stack 0',
                    };
                });

                setChartData({
                    labels: projects,
                    datasets,
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading chart...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-xl font-bold mb-4">SDE Role-wise Bandwidth Allocation</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                        title: {
                            display: true,
                            text: 'Bandwidth Allocation by Role per Project',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: 'Total Bandwidth (%)',
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default SDEAllocationByRole;