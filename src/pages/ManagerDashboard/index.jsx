import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadTeamData } from '../../store/slices/teamSlice';
import DashboardHighlights from './DashboardHighlights';
import TeamVerticalList from './TeamVerticalList';
import PerformanceSnapshot from './PerformanceSnapshot';
import ProjectTimeline from './ProjectTimeline';
import BlockersOverview from './BlockersOverview';
import Recommendations from './Recommendations';
import { Calendar, Bell, Settings } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { SignatureV4 } from "@aws-sdk/signature-v4";
import { HttpRequest } from "@aws-sdk/protocol-http";
import { Sha256 } from "@aws-crypto/sha256-js";
import SDEAllocationChart from "./SDEAllocationChart.jsx";
import TeamRolePieChart from "./TeamRolePieChart.jsx";
import PendingActions from "./PendingActions.jsx";

// DEV ONLY: IAM credentials should NOT be hardcoded in production
const accessKeyId = "Access_KEY";
const secretAccessKey = "Secret_key";
const region = "us-east-1";
const lambdaUrl = "Function_url";

const triggerLambda = async (month_year) => {
    try {
        const signer = new SignatureV4({
            credentials: { accessKeyId, secretAccessKey },
            service: "lambda",
            region,
            sha256: Sha256,
        });

        const payload = JSON.stringify({ month_year });

        const request = new HttpRequest({
            method: "POST",
            protocol: "https:",
            path: "/",
            headers: {
                "Content-Type": "application/json",
                host: new URL(lambdaUrl).host,
            },
            body: payload,
            hostname: new URL(lambdaUrl).host,
        });

        const signedRequest = await signer.sign(request);

        const response = await fetch(lambdaUrl, {
            method: signedRequest.method,
            headers: signedRequest.headers,
            body: signedRequest.body,
        });

        const text = await response.text(); // safer than response.json() in some cases

        console.log("Lambda Triggered Successfully");
        console.log("Lambda Response:", text);

    } catch (error) {
        console.error("Error triggering Lambda:", error);
    }
};



const ManagerDashboard = () => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(new Date('2025-04-01'));

    const selectedMonth = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}`;

    useEffect(() => {
        const month_year = selectedMonth;

        triggerLambda(month_year); // call the Lambda
        dispatch(loadTeamData());
    }, [dispatch, selectedMonth]);

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Top navigation bar */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                <h1 className="text-2xl font-bold text-blue-600">TeamPulse</h1>
                            </Link>
                            <nav className="ml-10 flex space-x-8">
                                <Link to="/" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
                                <Link to="/manager/team-summary" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium ">Team Summary</Link>
                                <Link to="/manager/project-summary" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Project Summary</Link>
                                <Link to="/manager/team-overview" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">Individual Overview</Link>
                            </nav>
                        </div>
                        <div className="flex items-center">
                            <button className="p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
                                <Bell size={20} />
                            </button>
                            <button className="ml-3 p-1 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none">
                                <Settings size={20} />
                            </button>
                            <div className="ml-3">
                                <button className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white">
                                    M
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Dashboard header */}
                <div className="mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Manager Dashboard</h2>
                            <p className="mt-1 text-sm text-gray-600">A holistic view of your team's performance and
                                project status</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-2">
                            <Calendar size={18} className="text-gray-500"/>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="MMMM yyyy"
                                showMonthYearPicker
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Top content area - Highlights + Team */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-6">
                    {/* Left column (3/4) */}
                    <div className="xl:col-span-3 space-y-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Highlights / Actions</h3>
                            <DashboardHighlights/>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Snapshot</h3>
                            <SDEAllocationChart/>
                        </div>
                    </div>

                    {/* Right column (1/4) */}
                    <div className="xl:col-span-1">
                        <div className="bg-white shadow rounded-lg h-full">
                            <div className="bg-blue-600 px-4 py-3">
                                <h3 className="text-lg font-medium text-white">Team Structure</h3>
                            </div>
                            <div className="flex-grow p-6 overflow-y-auto">
                                <TeamVerticalList/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Row - Timeline & Blockers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="bg-red-600 px-4 py-3 rounded-t-lg">
                            <h3 className="text-lg font-medium text-white">Blockers & Risks</h3>
                        </div>
                        <div className="p-6">
                            <BlockersOverview/>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="bg-yellow-600 px-4 py-3 rounded-t-lg">
                            <h3 className="text-lg font-medium text-white">Action Items</h3>
                        </div>
                        <div className="p-6">
                            <PendingActions/>
                        </div>
                    </div>
                </div>
                {/* Recommendations Section */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="bg-purple-600 px-4 py-3 rounded-t-lg">
                        <h3 className="text-lg font-medium text-white">AI-Powered Insight</h3>
                    </div>
                    <div className="p-6">
                        <Recommendations/>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ManagerDashboard;
