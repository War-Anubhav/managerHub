import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import {Link} from "react-router-dom";
import {Bell, Settings} from "lucide-react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TeamSummary = () => {
    const [crChartData, setCrChartData] = useState(null);
    const [ktloChartData, setKtloChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // Default to current month
    const [animateChart, setAnimateChart] = useState(false);
    const [highlights, setHighlights] = useState("");
    const [highlightsLoading, setHighlightsLoading] = useState(false);
    const [highlightsError, setHighlightsError] = useState(null);
    const [dataAvailable, setDataAvailable] = useState(true);

    // Get current date for limiting the month picker
    const currentDate = new Date().toISOString().slice(0, 7);

    // Format month for display (e.g., "February 2025")
    const formatMonthYear = (monthStr) => {
        return new Date(monthStr + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    // Effect: Fetch data and highlights for selected month
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setAnimateChart(false);
                setHighlightsLoading(true);
                setHighlightsError(null);
                setError(null);
                setDataAvailable(true); // Reset data availability flag

                // Fetch CR data
                const res = await axios.get('https://synthetic-crs.s3.us-east-1.amazonaws.com/CR_Details.json');
                const data = res.data?.team_projects || {};
                const supportActivities = res.data?.team_projects?.support_activities?.ktlo?.allocations || [];

                const crCounts = {};
                const ktloCounts = {};

                // Count CRs per member
                Object.values(data).forEach((project) => {
                    if (!project.team_allocations) return;
                    Object.entries(project.team_allocations).forEach(([member, details]) => {
                        if (!crCounts[member]) crCounts[member] = 0;
                        crCounts[member] += details.crs?.length || 0;
                    });
                });

                // Count KTLOs per member
                supportActivities.forEach((allocation) => {
                    const name = allocation.assignee;
                    if (!ktloCounts[name]) ktloCounts[name] = 0;
                    ktloCounts[name] += allocation.crs?.length || 0;
                });

                setCrChartData({
                    labels: Object.keys(crCounts),
                    datasets: [
                        {
                            label: 'CRs per Member',
                            data: Object.values(crCounts),
                            backgroundColor: 'rgba(59, 130, 246, 0.7)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                setKtloChartData({
                    labels: Object.keys(ktloCounts),
                    datasets: [
                        {
                            label: 'KTLOs per Member',
                            data: Object.values(ktloCounts),
                            backgroundColor: 'rgba(34, 197, 94, 0.7)',
                            borderColor: 'rgba(34, 197, 94, 1)',
                            borderWidth: 1,
                        },
                    ],
                });

                // Try to fetch highlights data for the selected month
                try {
                    const highlightsResponse = await axios.get(
                        `https://work-summaries.s3.us-east-1.amazonaws.com/work-summaries/team_highlights_lowlights/${selectedMonth}.json`
                    );

                    if (highlightsResponse.data && highlightsResponse.data.summary) {
                        setHighlights(highlightsResponse.data.summary);
                    } else {
                        setHighlights("");
                        setHighlightsError(`No highlights available for ${formatMonthYear(selectedMonth)}`);
                        setDataAvailable(false);
                    }
                } catch (err) {
                    console.error("Error fetching highlights:", err);
                    setHighlights("");
                    setHighlightsError(`No highlights data found for ${formatMonthYear(selectedMonth)}`);
                    setDataAvailable(false);
                }

                // Trigger animations after a small delay
                setTimeout(() => {
                    setLoading(false);
                    setHighlightsLoading(false);
                    setTimeout(() => {
                        setAnimateChart(true);
                    }, 100);
                }, 500);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || 'Failed to fetch team data');
                setCrChartData(null);
                setKtloChartData(null);
                setHighlights("");
                setHighlightsError(`No data available for ${formatMonthYear(selectedMonth)}`);
                setDataAvailable(false);
                setLoading(false);
                setHighlightsLoading(false);
            }
        };

        fetchData();
    }, [selectedMonth]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const getAnimationOptions = () => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 10,
                    cornerRadius: 6
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Count' },
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)',
                    },
                    ticks: {
                        delay: (context) => context.index * 100
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeOutQuart',
                delay: (context) => context.dataIndex * 100,
                y: {
                    from: 0
                }
            },
            transitions: {
                active: {
                    animation: {
                        duration: 300
                    }
                }
            }
        };
    };

    // Function to format highlights/lowlights with Markdown
    const formatHighlights = (text) => {
        if (!text) return null;

        // Split into sections (Highlights and potentially Lowlights)
        const sections = text.split(/(?=Highlights:|Lowlights:)/g);

        return sections.map((section, idx) => {
            if (!section.trim()) return null;

            const isHighlight = section.trim().startsWith('Highlights:');
            const title = isHighlight ? 'Highlights' : 'Lowlights';
            const bgColor = isHighlight ? 'bg-blue-50' : 'bg-amber-50';
            const borderColor = isHighlight ? 'border-blue-200' : 'border-amber-200';
            const titleColor = isHighlight ? 'text-blue-800' : 'text-amber-800';

            // Clean up the section text by removing the title
            const content = section.replace(/^(Highlights:|Lowlights:)/i, '').trim();

            return (
                <div key={idx} className={`${bgColor} border ${borderColor} rounded-lg p-6 mb-6`}>
                    <h3 className={`text-xl font-bold mb-4 ${titleColor}`}>{title}</h3>
                    <div className="prose max-w-none">
                        {content.split('\n').map((line, i) => {
                            // Handle indented list items (using 3 spaces as indicator)
                            if (line.match(/^\s{3,}-\s/)) {
                                return <p key={i} className="ml-8 mb-2">{line.trim()}</p>;
                            }
                            // Handle numbered list items
                            else if (line.match(/^\d+\.\s/)) {
                                return <p key={i} className="font-medium mb-2">{line}</p>;
                            }
                            // Regular text
                            else {
                                return <p key={i} className="mb-2">{line}</p>;
                            }
                        })}
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-blue-600">TeamPulse</h1>
                            </Link>
                            <nav className="ml-10 flex space-x-8">
                                <Link to="/"
                                      className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
                                <Link to="/manager/team-summary"
                                      className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">Team
                                    Summary</Link>
                                <Link to="/manager/project-summary"
                                      className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Project
                                    Summary</Link>
                                <Link to="/manager/team-overview"
                                      className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Individual
                                    Overview</Link>
                            </nav>
                        </div>
                        <div className="flex items-center">
                            <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
                                <Bell size={20}/>
                            </button>
                            <button
                                className="ml-3 p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
                                <Settings size={20}/>
                            </button>
                            <div className="ml-3">
                                <button
                                    className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white">
                                    M
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">Team Performance Dashboard</h1>

                        <div className="mt-4 md:mt-0 w-full md:w-auto">
                            <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Month
                            </label>
                            <input
                                type="month"
                                id="month-select"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                max={currentDate}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full md:w-auto"
                            />
                        </div>
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                                     style={{animationDelay: '0s'}}></div>
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                                     style={{animationDelay: '0.2s'}}></div>
                                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                                     style={{animationDelay: '0.4s'}}></div>
                                <span className="ml-2 text-lg text-gray-600">Loading data...</span>
                            </div>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && !dataAvailable && (
                        <div
                            className="bg-yellow-50 border-l-4 border-yellow-500 p-8 mb-6 flex flex-col items-center justify-center text-center h-64">
                            <svg className="h-12 w-12 text-yellow-500 mb-4" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            <h2 className="text-xl font-medium text-yellow-800 mb-2">No Data Available</h2>
                            <p className="text-yellow-700">No team performance data or highlights available
                                for {formatMonthYear(selectedMonth)}.</p>
                            <p className="text-yellow-600 mt-2">Please select a different month.</p>
                        </div>
                    )}

                    {!loading && !error && dataAvailable && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            {crChartData && (
                                <div
                                    className={`bg-white rounded-lg shadow p-4 border border-gray-100 transition-all duration-500 ${animateChart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">CRs per Member</h2>
                                    <div className="h-64">
                                        <Bar data={crChartData} options={getAnimationOptions()}/>
                                    </div>
                                </div>
                            )}

                            {ktloChartData && (
                                <div
                                    className={`bg-white rounded-lg shadow p-4 border border-gray-100 transition-all duration-500 delay-100 ${animateChart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                    <h2 className="text-xl font-semibold mb-4 text-gray-800">KTLOs per Member</h2>
                                    <div className="h-64">
                                        <Bar data={ktloChartData} options={getAnimationOptions()}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Highlights and Lowlights Section */}
                    {!loading && !error && dataAvailable && (
                        <div
                            className={`mt-8 transition-all duration-700 ${animateChart ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="border-b border-gray-200 mb-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Highlights &
                                    Lowlights</h2>
                            </div>

                            {highlightsLoading && (
                                <div className="py-8 flex justify-center items-center">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"
                                             style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"
                                             style={{animationDelay: '0.4s'}}></div>
                                        <span className="text-gray-600">Loading highlights...</span>
                                    </div>
                                </div>
                            )}

                            {highlightsError && !highlightsLoading && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                    <p className="text-gray-600">{highlightsError}</p>
                                </div>
                            )}

                            {!highlightsLoading && !highlightsError && highlights && (
                                <div className="animate-fadeIn">
                                    {formatHighlights(highlights)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TeamSummary;