import { ChevronDown, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import MetricsCard from '../cards/MetricsCard';
import StatusCard from '../cards/StatusCard';

export default function IndividualSDESummary() {
    const performanceMetrics = [
        { label: 'Code Velocity', value: '85%', percentage: '85%', color: 'bg-green-500' },
        { label: 'Code Quality', value: '92%', percentage: '92%', color: 'bg-blue-500' },
        { label: 'On-time Delivery', value: '78%', percentage: '78%', color: 'bg-yellow-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Individual SDE Summary</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Select Engineer:</span>
                    <div className="relative">
                        <select className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
                            <option>John Doe</option>
                            <option>Jane Smith</option>
                            <option>Alex Johnson</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricsCard title="Performance Metrics" metrics={performanceMetrics} />

                <StatusCard title="Recent Activity">
                    <div className="space-y-3">
                        <div className="flex items-start">
                            <Clock size={16} className="text-gray-500 mt-1 mr-2" />
                            <div>
                                <p className="text-sm font-medium">Completed PR #1234</p>
                                <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mt-1 mr-2" />
                            <div>
                                <p className="text-sm font-medium">Code Review Feedback Addressed</p>
                                <p className="text-xs text-gray-500">Yesterday, 4:15 PM</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <AlertCircle size={16} className="text-red-500 mt-1 mr-2" />
                            <div>
                                <p className="text-sm font-medium">Build Failure Reported</p>
                                <p className="text-xs text-gray-500">April 20, 2:45 PM</p>
                            </div>
                        </div>
                    </div>
                </StatusCard>

                <StatusCard
                    title="Growth Areas"
                    footer={
                        <>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">AI Recommendations</h4>
                            <p className="text-sm text-gray-600">Consider pairing with senior engineers on the authentication service refactoring to improve architecture skills.</p>
                        </>
                    }
                >
                    <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            <span>Technical Documentation</span>
                        </li>
                        <li className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            <span>Microservices Architecture</span>
                        </li>
                        <li className="flex items-center text-sm">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            <span>Cross-team Collaboration</span>
                        </li>
                    </ul>
                </StatusCard>
            </div>
        </div>
    );
}
