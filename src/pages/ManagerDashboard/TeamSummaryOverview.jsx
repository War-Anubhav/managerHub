import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Bell, Settings} from "lucide-react";

const TeamSummaryOverview = () => {
    const reports = useSelector((state) => state.team.reports);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

    const [monthNum, setMonthNum] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [summaries, setSummaries] = useState({});
    const [loading, setLoading] = useState(true);
    const [showCalendar, setShowCalendar] = useState(false);

    const monthName = new Date(parseInt(year), parseInt(monthNum) - 1).toLocaleString('default', { month: 'long' });

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const results = {};

            for (const member of reports) {
                const email = member.email;
                const url = ``;

                try {
                    const { data } = await axios.get(url);
                    results[email] = data;
                } catch (err) {
                    results[email] = null;
                }
            }

            setSummaries(results);
            setLoading(false);
        };

        fetchData();
    }, [monthNum, year, reports]);

    const getActivityStatus = (summary) => {
        if (!summary) return { color: "gray", text: "No Data" };
        if (summary.email_count > 10) return { color: "green", text: "Very Active" };
        if (summary.email_count > 5) return { color: "blue", text: "Active" };
        return { color: "yellow", text: "Low Activity" };
    };

    const statusColors = {
        green: "bg-green-100 text-green-800 border-green-200",
        blue: "bg-blue-100 text-blue-800 border-blue-200",
        yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
        gray: "bg-gray-100 text-gray-800 border-gray-200"
    };

    // Generate years array (2023 to current year)
    const availableYears = [];
    const startYear = 2023;
    for (let y = startYear; y <= currentDate.getFullYear(); y++) {
        availableYears.push(y.toString());
    }

    // Handle month change with validation
    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;

        // If selecting a month in the current year
        if (year === currentYear) {
            // Only allow months up to the current month
            if (parseInt(selectedMonth) <= parseInt(currentMonth)) {
                setMonthNum(selectedMonth);
            }
        } else {
            // For past years, allow any month
            setMonthNum(selectedMonth);
        }
    };

    // Handle year change with validation
    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);

        // If changing to current year and the currently selected month is in the future
        if (selectedYear === currentYear && parseInt(monthNum) > parseInt(currentMonth)) {
            setMonthNum(currentMonth);
        }
    };

    // Close calendar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showCalendar && !event.target.closest('#calendar-dropdown')) {
                setShowCalendar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showCalendar]);

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
                                      className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium ">Team
                                    Summary</Link>
                                <Link to="/manager/project-summary"
                                      className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Project
                                    Summary</Link>
                                <Link to="/manager/team-overview"
                                      className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">Individual
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
            <div className="max-w-7xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white rounded-xl shadow-sm">
                {/* Header Section */}
                <div className="mb-8 border-b border-gray-200 pb-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500 mr-3"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <h1 className="text-3xl font-bold text-gray-800">Individual's Monthly Summary</h1>
                            </div>
                            <p className="text-gray-600 max-w-2xl">
                                Monthly overview of individual's work summaries and achievements. Select a different
                                month or year to view historical data.
                            </p>
                        </div>

                        <div className="relative" id="calendar-dropdown">
                            <button
                                onClick={() => setShowCalendar(!showCalendar)}
                                className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 border border-gray-300 text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span className="font-medium">{monthName} {year}</span>
                                <svg className="ml-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>

                            {showCalendar && (
                                <div
                                    className="absolute z-10 mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72">
                                    {/* Year Selection */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {availableYears.map(yearOption => (
                                                <button
                                                    key={yearOption}
                                                    onClick={() => {
                                                        setYear(yearOption);
                                                        // Reset month if needed
                                                        if (yearOption === currentYear && parseInt(monthNum) > parseInt(currentMonth)) {
                                                            setMonthNum(currentMonth);
                                                        }
                                                    }}
                                                    className={`px-2 py-1 text-sm rounded-md ${
                                                        year === yearOption
                                                            ? 'bg-indigo-600 text-white'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                                    }`}
                                                >
                                                    {yearOption}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Month Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {Array.from({length: 12}, (_, i) => {
                                                const m = String(i + 1).padStart(2, '0');
                                                const monthName = new Date(0, i).toLocaleString('default', {month: 'short'});
                                                const isDisabled =
                                                    year === currentYear && parseInt(m) > parseInt(currentMonth);

                                                return (
                                                    <button
                                                        key={m}
                                                        onClick={() => !isDisabled && setMonthNum(m)}
                                                        className={`px-2 py-1 text-sm rounded-md ${
                                                            monthNum === m
                                                                ? 'bg-indigo-600 text-white'
                                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                                        } ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                                                        disabled={isDisabled}
                                                    >
                                                        {monthName}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2 border-t border-gray-200 flex justify-end">
                                        <button
                                            onClick={() => setShowCalendar(false)}
                                            className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Period Banner */}
                <div
                    className="bg-indigo-600 text-white p-4 rounded-lg shadow-md mb-8 flex items-center justify-between">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <h2 className="text-xl font-semibold">{monthName} {year} Summary</h2>
                    </div>
                    <div className="text-sm bg-indigo-700 px-3 py-1 rounded-full">
                        {reports.length} Team Members
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        <span className="ml-3 text-gray-600">Loading team data...</span>
                    </div>
                )}

                {/* Team Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!loading && reports.map((member) => {
                        const summary = summaries[member.email];
                        const status = getActivityStatus(summary);

                        return (
                            <Link
                                to={`/manager/individual-reports/${encodeURIComponent(member.email)}`}
                                key={member.email}
                                className="block group"
                            >
                                <div
                                    className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 transition duration-200 group-hover:shadow-md group-hover:border-indigo-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center">
                                            <div
                                                className="bg-indigo-100 text-indigo-700 rounded-full w-10 h-10 flex items-center justify-center font-semibold mr-3">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h2 className="font-semibold text-lg text-gray-800 group-hover:text-indigo-600 transition">{member.name}</h2>
                                                <p className="text-xs text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded-full border ${statusColors[status.color]}`}>
                                        {status.text}
                                    </span>
                                    </div>

                                    <div className="mb-3 border-t border-gray-100 pt-3">
                                        <div className="text-sm text-gray-700 line-clamp-4 h-20 overflow-hidden">
                                            {summary?.work_summary || "No summary available for this period."}
                                        </div>
                                    </div>

                                    {summary && (
                                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                                            <div className="bg-gray-50 p-2 rounded">
                                                <span className="text-gray-500 block">Emails</span>
                                                <span className="font-medium">{summary.email_count || 0}</span>
                                            </div>
                                            <div className="bg-gray-50 p-2 rounded">
                                                <span className="text-gray-500 block">Last Updated</span>
                                                <span
                                                    className="font-medium truncate">{summary.last_updated ? new Date(summary.last_updated).toLocaleDateString() : "N/A"}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-4 text-right">
                                    <span className="text-indigo-600 text-sm font-medium group-hover:underline">
                                        View Details →
                                    </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Empty State */}
                {!loading && reports.length === 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        <h3 className="text-lg font-medium text-gray-700 mb-1">No team members found</h3>
                        <p className="text-gray-500">There are no team members to display for this period.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default TeamSummaryOverview;