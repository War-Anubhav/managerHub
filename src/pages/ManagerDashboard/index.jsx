import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Bell, ChevronDown, Search } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import TeamInsights from "./TeamInsights.jsx";

// Mock data for the dashboard
const mockRevenueData = {
    value: '89.5%',
    change: '2.1% vs last month',
    isPositive: true,
    chartData: [
        { day: '01', current: 75, previous: 65 },
        { day: '02', current: 65, previous: 70 },
        { day: '03', current: 70, previous: 60 },
        { day: '04', current: 80, previous: 75 },
        { day: '05', current: 85, previous: 65 },
        { day: '06', current: 90, previous: 60 },
        { day: '07', current: 75, previous: 70 },
        { day: '08', current: 65, previous: 60 },
        { day: '09', current: 70, previous: 65 },
        { day: '10', current: 60, previous: 55 },
        { day: '11', current: 80, previous: 70 },
        { day: '12', current: 85, previous: 60 },
    ]
};

const mockOrderData = {
    value: '153',
    change: '2.1% vs last month',
    isPositive: false,
    chartData: [
        { day: '01', current: 40, previous: 35 },
        { day: '02', current: 55, previous: 50 },
        { day: '03', current: 45, previous: 40 },
        { day: '04', current: 35, previous: 45 },
        { day: '05', current: 40, previous: 35 },
        { day: '06', current: 60, previous: 40 },
    ]
};

const mockTimeData = {
    fromDate: '1-6 Apr, 2025',
    distribution: [
        { time: 'Morning', percentage: 28, color: 'bg-blue-100' },
        { time: 'Afternoon', percentage: 40, color: 'bg-blue-500' },
        { time: 'Evening', percentage: 32, color: 'bg-blue-300' }
    ],
    highlight: {
        time: 'Afternoon',
        hours: '1pm - 4pm',
        value: '72 tasks'
    }
};

const ManagerDashboard = () => {
    const [selectedDate, setSelectedDate] = useState(new Date('2025-04-01'));
    const [searchQuery, setSearchQuery] = useState('');
    const [projectNames, setProjectNames] = useState([]);

    useEffect(() => {
        const fetchProjectData = async () => {
            const dateKey = selectedDate.toISOString().slice(0, 7); // "YYYY-MM"
            const url = `https://work-summaries.s3.us-east-1.amazonaws.com/work-summaries/projects/${dateKey}.json`;
            try {
                const res = await axios.get(url);
                const projects = Object.keys(res.data.summaries || {});
                setProjectNames(projects);
            } catch (err) {
                console.error("Error fetching project summaries:", err);
                setProjectNames([]); // fallback to empty list
            }
        };
        fetchProjectData();
    }, [selectedDate]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-md flex items-center justify-center text-lg font-bold">
                            T
                        </div>
                        <h1 className="ml-2 text-lg font-bold text-gray-800">TEAMPULSE</h1>
                    </div>
                </div>

                <div className="p-4 border-b border-gray-200">
                    <div className="text-xs font-medium text-gray-500 mb-4">MENU</div>
                    <nav className="space-y-1">
                        <Link to="/" className="flex items-center px-2 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-md">
                            <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                                <span className="text-blue-600 text-xs">DB</span>
                            </div>
                            Dashboard
                        </Link>
                        <Link to="/manager/team-summary" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                <span className="text-gray-600 text-xs">TI</span>
                            </div>
                            Team Insight
                        </Link>
                        <Link to="/manager/project-summary" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                <span className="text-gray-600 text-xs">PI</span>
                            </div>
                            Project Insight
                        </Link>
                        <Link to="/manager/team-overview" className="flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md">
                            <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                <span className="text-gray-600 text-xs">IR</span>
                            </div>
                            Individual Review
                        </Link>
                    </nav>
                </div>

            </div>

            {/* Main content */}
            <div className="flex-1">
                {/* Top header */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between px-6 py-3">
                        <div className="relative w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={16} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center">
                            <button className="px-4 py-2 bg-orange-50 text-orange-600 rounded-md font-medium flex items-center">
                                Team Alpha
                                <ChevronDown size={16} className="ml-2" />
                            </button>
                            <button className="ml-4 p-1 text-gray-400 hover:text-gray-500">
                                <Bell size={20} />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard content */}
                <main className="p-6">
                    <h1 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h1>

                    {/* Top row metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Team Productivity */}
                        <div className="bg-white p-6 shadow-sm rounded-md">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-medium text-gray-700">Team Productivity</h2>
                                <Link to="/manager/team-summary" className="text-sm text-blue-600 hover:text-blue-800">View Report</Link>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="text-3xl font-bold text-gray-800">{mockRevenueData.value}</div>
                                <div className={`ml-2 text-sm flex items-center ${mockRevenueData.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {mockRevenueData.isPositive ? '↑' : '↓'} {mockRevenueData.change}
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 mb-6">Productivity from 1-12 Apr, 2025</div>

                            {/* Chart */}
                            <div className="flex justify-between h-40 items-end">
                                {mockRevenueData.chartData.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="flex justify-center space-x-1">
                                            <div
                                                className="w-2 bg-blue-500 rounded-sm"
                                                style={{ height: `${data.current}px` }}
                                            ></div>
                                            <div
                                                className="w-2 bg-gray-200 rounded-sm"
                                                style={{ height: `${data.previous}px` }}
                                            ></div>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500">{data.day}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mt-4 space-x-6">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    <span className="text-xs text-gray-600">Last 6 days</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-gray-200 rounded-full mr-2"></div>
                                    <span className="text-xs text-gray-600">Last Week</span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Time */}
                        <div className="bg-white p-6 shadow-sm rounded-md">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-medium text-gray-700">Activity Time</h2>
                                <Link to="/manager/team-summary" className="text-sm text-blue-600 hover:text-blue-800">View Report</Link>
                            </div>
                            <div className="text-sm text-gray-600 mb-6">From {mockTimeData.fromDate}</div>

                            <div className="flex">
                                <div className="w-1/2 flex items-center justify-center">
                                    <div className="relative w-40 h-40">
                                        {/* Donut chart - would use SVG in a real implementation */}
                                        <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-full">
                                                <div
                                                    className="absolute transform origin-center rotate-0 bg-blue-500"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)'
                                                    }}
                                                ></div>
                                                <div
                                                    className="absolute transform origin-center rotate-90 bg-blue-300"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 40%, 50% 40%)'
                                                    }}
                                                ></div>
                                                <div
                                                    className="absolute transform origin-center rotate-150 bg-blue-100"
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        clipPath: 'polygon(50% 50%, 50% 0%, 90% 0%, 90% 30%, 50% 30%)'
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center">
                                                    <div className="text-sm font-medium text-gray-600">{mockTimeData.highlight.time}</div>
                                                    <div className="text-xs text-gray-500">{mockTimeData.highlight.hours}</div>
                                                    <div className="mt-1 text-lg font-bold text-blue-600">{mockTimeData.highlight.value}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/2 flex flex-col justify-center space-y-4">
                                    {mockTimeData.distribution.map((item, index) => (
                                        <div key={index} className="flex items-center">
                                            <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                                            <div className="text-sm text-gray-700">{item.time}</div>
                                            <div className="ml-auto text-sm font-medium text-gray-600">{item.percentage}%</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom row metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Team Rating */}
                        <TeamInsights />

                        {/* Top Performers */}
                        <div className="bg-white p-6 shadow-sm rounded-md">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-medium text-gray-700">Most Active Tasks</h2>
                            </div>
                            <div className="text-sm text-gray-600 mb-6">Top performing team activities</div>

                            <div className="space-y-4">
                                {projectNames.length > 0 ? (
                                    projectNames.map((project, index) => (
                                        <div key={index} className="flex items-center">
                                            <div
                                                className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                                                <span className="text-gray-500 text-sm">#{index + 1}</span>
                                            </div>
                                            <div className="flex-1">
                                                <div
                                                    className="text-sm font-medium text-gray-800">{project.replace(/_/g, ' ')}</div>
                                            </div>
                                            <div className="text-sm font-medium text-gray-700">View</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-gray-500">No projects found for selected month.</div>
                                )}
                            </div>
                        </div>

                        {/* Tasks Report */}
                        <div className="bg-white p-6 shadow-sm rounded-md">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-base font-medium text-gray-700">Tasks</h2>
                                <Link to="/manager/project-summary" className="text-sm text-blue-600 hover:text-blue-800">View
                                    Report</Link>
                            </div>
                            <div className="flex items-center mb-2">
                                <div className="text-3xl font-bold text-gray-800">{mockOrderData.value}</div>
                                <div
                                    className={`ml-2 text-sm flex items-center ${mockOrderData.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                    {mockOrderData.isPositive ? '↑' : '↓'} {mockOrderData.change}
                                </div>
                            </div>
                            <div className="text-sm text-gray-600 mb-6">Tasks from 1-6 Apr, 2025</div>

                            {/* Line chart */}
                            <div className="h-40 relative">
                                <svg className="w-full h-full" viewBox="0 0 300 150">
                                    {/* Gray line */}
                                    <path
                                        d="M20,120 L60,90 L100,110 L140,80 L180,100 L220,70"
                                        fill="none"
                                        stroke="#e5e7eb"
                                        strokeWidth="2"
                                    />
                                    {/* Blue line */}
                                    <path
                                        d="M20,100 L60,80 L100,90 L140,70 L180,60 L220,30"
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="2"
                                    />
                                    {/* Dots for blue line */}
                                    <circle cx="20" cy="100" r="3" fill="#3b82f6"/>
                                    <circle cx="60" cy="80" r="3" fill="#3b82f6"/>
                                    <circle cx="100" cy="90" r="3" fill="#3b82f6"/>
                                    <circle cx="140" cy="70" r="3" fill="#3b82f6"/>
                                    <circle cx="180" cy="60" r="3" fill="#3b82f6"/>
                                    <circle cx="220" cy="30" r="3" fill="#3b82f6"/>
                                </svg>

                                <div
                                    className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                                    <div>01</div>
                                    <div>02</div>
                                    <div>03</div>
                                    <div>04</div>
                                    <div>05</div>
                                    <div>06</div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-4 space-x-6">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    <span className="text-xs text-gray-600">Last 6 days</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-gray-200 rounded-full mr-2"></div>
                                    <span className="text-xs text-gray-600">Last Week</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ManagerDashboard;

