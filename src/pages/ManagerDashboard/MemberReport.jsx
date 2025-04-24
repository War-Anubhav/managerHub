import {Link, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Bell, Settings} from "lucide-react";

const MemberReport = () => {
    const { email } = useParams();
    const decodedEmail = decodeURIComponent(email);

    const current = new Date();
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth() + 1; // JavaScript months are 0-indexed

    const [year, setYear] = useState(currentYear.toString());
    const [month, setMonth] = useState(String(currentMonth).padStart(2, '0'));
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dateKey = `${year}-${month}`;
    const url = `https://work-summaries.s3.us-east-1.amazonaws.com/work-summaries/${encodeURIComponent(decodedEmail)}/${dateKey}.json`;

    const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' });

    // Handle year change - if changing to current year and selected month is beyond current month, reset to current month
    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);

        // If selected year is current year and selected month is beyond current month, reset to current month
        if (parseInt(selectedYear) === currentYear && parseInt(month) > currentMonth) {
            setMonth(String(currentMonth).padStart(2, '0'));
        }
    };

    useEffect(() => {
        const fetchSummary = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(url);
                setSummary(data);
            } catch (err) {
                console.error(err);
                setError('Could not fetch summary');
                setSummary(null);
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [url]);

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
                                      className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Team
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
            <div
                className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg space-y-8">
                {/* Header Section */}
                <div
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-indigo-800 flex items-center gap-2">
                        <span className="text-indigo-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </span>
                            Monthly Summary
                        </h1>
                        <div className="mt-2 flex items-center">
                        <span className="text-gray-500 text-sm mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </span>
                            <span className="text-gray-600 text-sm font-medium bg-gray-100 py-1 px-3 rounded-full">
                            {decodedEmail}
                        </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative">
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                            >
                                {Array.from({length: 12}, (_, i) => {
                                    const m = String(i + 1).padStart(2, '0');
                                    // Disable future months if the selected year is the current year
                                    const isDisabled = parseInt(year) === currentYear && (i + 1) > currentMonth;

                                    return (
                                        <option
                                            key={m}
                                            value={m}
                                            disabled={isDisabled}
                                            className={isDisabled ? "text-gray-400" : ""}
                                        >
                                            {new Date(0, i).toLocaleString('default', {month: 'long'})}
                                            {isDisabled ? " (Future)" : ""}
                                        </option>
                                    );
                                })}
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                value={year}
                                onChange={handleYearChange}
                                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                            >
                                {/* Only show current and past years */}
                                {Array.from({ length: 2 }, (_, i) => {
                                    const yearValue = (currentYear - i).toString();
                                    return (
                                        <option key={yearValue} value={yearValue}>
                                            {yearValue}
                                        </option>
                                    );
                                })}
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date Banner */}
                <div className="bg-indigo-700 text-white py-4 px-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">
                            {monthName} {year} Report
                        </h2>
                        {summary && (
                            <div className="text-sm bg-indigo-800 px-3 py-1 rounded-full">
                                Last Updated: {summary.last_updated}
                            </div>
                        )}
                    </div>
                </div>

                {/* Loading and Error States */}
                {loading && (
                    <div className="flex justify-center items-center p-8">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        <span className="ml-3 text-gray-600">Loading summary...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary Content */}
                {summary && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <InfoCard
                            title="Work Summary"
                            text={summary.work_summary}
                            icon="document"
                            color="blue"
                        />
                        <InfoCard
                            title="Weekly Status"
                            text={summary.weekly_status}
                            icon="status"
                            color="green"
                        />
                        <InfoCard
                            title="Blockers"
                            text={summary.blockers}
                            icon="warning"
                            color="red"
                        />
                        <InfoCard
                            title="Achievements"
                            text={summary.achievements}
                            icon="trophy"
                            color="yellow"
                        />
                        <InfoCard
                            title="Working Backward Plan"
                            text={summary.working_backward}
                            icon="plan"
                            color="purple"
                        />
                        <InfoCard
                            title="Emails Sent"
                            text={`${summary.email_count} emails`}
                            icon="mail"
                            color="indigo"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

const InfoCard = ({title, text, icon, color}) => {
    // Color configurations
    const colorVariants = {
        blue: "bg-blue-50 border-blue-200 shadow-blue-100",
        green: "bg-green-50 border-green-200 shadow-green-100",
        red: "bg-red-50 border-red-200 shadow-red-100",
        yellow: "bg-yellow-50 border-yellow-200 shadow-yellow-100",
        purple: "bg-purple-50 border-purple-200 shadow-purple-100",
        indigo: "bg-indigo-50 border-indigo-200 shadow-indigo-100",
    };

    const titleColors = {
        blue: "text-blue-700",
        green: "text-green-700",
        red: "text-red-700",
        yellow: "text-yellow-700",
        purple: "text-purple-700",
        indigo: "text-indigo-700",
    };

    const iconColors = {
        blue: "text-blue-500",
        green: "text-green-500",
        red: "text-red-500",
        yellow: "text-yellow-500",
        purple: "text-purple-500",
        indigo: "text-indigo-500",
    };

    // Icon selection
    const getIcon = (iconName) => {
        switch (iconName) {
            case 'document':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                );
            case 'status':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                );
            case 'warning':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                );
            case 'trophy':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                );
            case 'plan':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                );
            case 'mail':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <div className={`rounded-lg border p-5 ${colorVariants[color]} transition duration-200 hover:shadow-md`}>
            <div className="flex items-center mb-3">
                <div className={`p-2 rounded-full mr-3 ${iconColors[color]} bg-white shadow-sm`}>
                    {getIcon(icon)}
                </div>
                <h3 className={`text-lg font-semibold ${titleColors[color]}`}>{title}</h3>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-1">
                <p className="text-gray-700 whitespace-pre-wrap text-sm">{text}</p>
            </div>
        </div>
    );
};

export default MemberReport;