import { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectSummary = () => {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    // Format year and month for API call
    const year = selectedDate.getFullYear().toString();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dateKey = `${year}-${month}`;
    const url = `https://work-summaries.s3.us-east-1.amazonaws.com/work-summaries/projects/${dateKey}.json`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(url);
                setProjectData(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Could not fetch project summary");
                setProjectData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    const summaries = projectData?.summaries || {};
    const projectKeys = Object.keys(summaries).sort();

    // Calendar navigation functions
    const goToPreviousMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);

        // Don't allow selecting future dates beyond current date
        if (newDate <= currentDate) {
            setSelectedDate(newDate);
        }
    };

    // Format month and year for display
    const monthYearDisplay = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    // Generate years for selection (from 5 years ago to current year)
    const currentYear = currentDate.getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

    // Handle month and year selection
    const handleMonthChange = (monthIndex) => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(monthIndex);

        // Reset to current month if the resulting date would be in the future
        if (newDate > currentDate) {
            newDate.setMonth(currentDate.getMonth());
            newDate.setFullYear(currentDate.getFullYear());
        }

        setSelectedDate(newDate);
        setShowCalendar(false);
    };

    const handleYearChange = (year) => {
        const newDate = new Date(selectedDate);
        newDate.setFullYear(year);

        // Reset to current month/year if the resulting date would be in the future
        if (newDate > currentDate) {
            if (year === currentDate.getFullYear()) {
                newDate.setMonth(currentDate.getMonth());
            } else {
                newDate.setMonth(0); // January if it's a past year
            }
        }

        setSelectedDate(newDate);
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
        <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Summary</h1>

                {/* Calendar Navigation */}
                <div className="flex justify-between items-center mb-6 bg-blue-50 p-4 rounded-lg">
                    <button
                        onClick={goToPreviousMonth}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Previous
                    </button>

                    <div className="relative" id="calendar-dropdown">
                        <button
                            onClick={() => setShowCalendar(!showCalendar)}
                            className="text-xl font-semibold text-gray-800 flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {monthYearDisplay}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {showCalendar && (
                            <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-72">
                                {/* Year Selection */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {years.map(year => (
                                            <button
                                                key={year}
                                                onClick={() => handleYearChange(year)}
                                                className={`px-2 py-1 text-sm rounded-md ${
                                                    selectedDate.getFullYear() === year
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                                } ${year > currentYear ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={year > currentYear}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Month Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {Array.from({ length: 12 }, (_, i) => {
                                            const monthName = new Date(0, i).toLocaleString('default', { month: 'short' });
                                            const isDisabled =
                                                selectedDate.getFullYear() === currentDate.getFullYear() &&
                                                i > currentDate.getMonth();

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => handleMonthChange(i)}
                                                    className={`px-2 py-1 text-sm rounded-md ${
                                                        selectedDate.getMonth() === i
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    disabled={isDisabled}
                                                >
                                                    {monthName}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={goToNextMonth}
                        className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center ${
                            selectedDate.getMonth() === currentDate.getMonth() &&
                            selectedDate.getFullYear() === currentDate.getFullYear()
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                        }`}
                        disabled={
                            selectedDate.getMonth() === currentDate.getMonth() &&
                            selectedDate.getFullYear() === currentDate.getFullYear()
                        }
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
                    <div className="flex justify-center">
                        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                    <p className="text-gray-500 mt-4 text-lg">Loading project data...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-red-700 font-medium">{error}</p>
                            <p className="text-red-500 mt-1">No data available for {monthYearDisplay}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Project Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectKeys.map((key) => (
                    <div
                        key={key}
                        className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">
                                {key.replace(/_/g, ' ')}
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-auto">
                                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                                    {summaries[key]}
                                </pre>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {projectKeys.length === 0 && !loading && !error && (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No Projects Found</h3>
                    <p className="text-gray-500">There are no project summaries available for {monthYearDisplay}</p>
                </div>
            )}
        </div>
    );
};

export default ProjectSummary;