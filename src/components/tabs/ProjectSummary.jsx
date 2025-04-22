import { Calendar, Clock, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';
import StatusCard from '../cards/StatusCard';

export default function ProjectSummary() {
    const projectStatusMetrics = [
        { label: 'Timeline', value: 'At Risk', percentage: '70%', color: 'bg-yellow-500' },
        { label: 'Budget', value: 'On Target', percentage: '85%', color: 'bg-green-500' },
        { label: 'Quality', value: 'Good', percentage: '90%', color: 'bg-green-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Project Summary</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Project:</span>
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Cloud Migration</option>
                        <option>Platform Redesign</option>
                        <option>Mobile App v2</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard title="Project Status">
                    <div className="flex items-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                            <span className="text-indigo-700 text-xl font-bold">75%</span>
                        </div>
                        <div>
                            <p className="text-gray-800 font-medium">Overall Completion</p>
                            <p className="text-sm text-gray-500">On track for May deadline</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {projectStatusMetrics.map((metric, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">{metric.label}</span>
                                    <span className={`font-medium ${
                                        metric.value === 'At Risk' ? 'text-yellow-600' : 'text-green-600'
                                    }`}>{metric.value}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`${metric.color} h-2 rounded-full`}
                                        style={{ width: metric.percentage }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </StatusCard>

                <StatusCard
                    title="Key Milestones"
                    footer={
                        <div className="flex items-center">
                            <Calendar size={16} className="text-gray-500 mr-2" />
                            <span className="text-sm text-gray-600">Projected completion: May 15, 2025</span>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mt-1 mr-2" />
                            <div>
                                <p className="text-sm font-medium">Database Migration</p>
                                <p className="text-xs text-gray-500">Completed April 10</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mt-1 mr-2" />
                            <div>
                                <p className="text-sm font-medium">API Refactoring</p>
                                <p className="text-xs text-gray-500">Completed April 18</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Clock size={16} className="text-yellow-500 mt-1 mr-2" />
                            <div>
                                <p className="text-sm font-medium">Frontend Integration</p>
                                <p className="text-xs text-gray-500">In Progress (75%)</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <AlertCircle size={16} className="text-gray-300 mt-1 mr-2" />
                            <div>
                                <p className="text-sm font-medium">Performance Testing</p>
                                <p className="text-xs text-gray-500">Not Started</p>
                            </div>
                        </div>
                    </div>
                </StatusCard>

                <StatusCard
                    title="Risk Assessment"
                    footer={
                        <>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">AI Recommendations</h4>
                            <p className="text-sm text-gray-600">Consider pulling in 1-2 engineers from the analytics team to help with the backend integration work.</p>
                        </>
                    }
                >
                    <div className="space-y-3">
                        <div className="bg-red-50 p-3 rounded-md">
                            <h4 className="text-sm font-medium text-red-800">High Risk: Resource Constraints</h4>
                            <p className="text-xs text-red-700 mt-1">Backend team is under-resourced for upcoming integration phase.</p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-md">
                            <h4 className="text-sm font-medium text-yellow-800">Medium Risk: External Dependency</h4>
                            <p className="text-xs text-yellow-700 mt-1">Third-party API integration timeline uncertain.</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-md">
                            <h4 className="text-sm font-medium text-green-800">Low Risk: Technology Stack</h4>
                            <p className="text-xs text-green-700 mt-1">Team has strong expertise in all required technologies.</p>
                        </div>
                    </div>
                </StatusCard>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Sprint Burndown</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                    <BarChart3 size={64} />
                </div>
                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-700">Current Sprint: #24</p>
                            <p className="text-xs text-gray-500">April 15 - April 29</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">62 points completed</p>
                            <p className="text-xs text-gray-500">out of 85 planned (73%)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
