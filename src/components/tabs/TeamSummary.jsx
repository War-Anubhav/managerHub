import { BarChart3 } from 'lucide-react';
import StatusCard from '../cards/StatusCard';

export default function TeamSummary() {
    const teamHealthMetrics = [
        { label: 'Sprint Completion Rate', value: '92%', percentage: '92%', color: 'bg-green-500' },
        { label: 'Team Morale', value: '85%', percentage: '85%', color: 'bg-blue-500' },
        { label: 'Code Quality', value: '88%', percentage: '88%', color: 'bg-indigo-500' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Team Summary</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Time Period:</span>
                    <select className="bg-white border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>Year to Date</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatusCard title="Team Capacity">
                    <div className="flex items-center justify-center h-48">
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <BarChart3 size={64} />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Team utilization is at 87% with 3 engineers available for new tasks.</p>
                </StatusCard>

                <StatusCard title="Skill Distribution">
                    <div className="flex items-center justify-center h-48">
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                            <div className="w-32 h-32 rounded-full border-8 border-indigo-500 flex items-center justify-center">
                                <span className="text-gray-700">Chart Placeholder</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Backend: 45%, Frontend: 30%, DevOps: 15%, QA: 10%</p>
                </StatusCard>

                <StatusCard
                    title="Team Health"
                    footer={
                        <>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Factors</h4>
                            <p className="text-sm text-gray-600">Two team members are approaching burnout threshold based on recent after-hours work patterns.</p>
                        </>
                    }
                >
                    <div className="space-y-4">
                        {teamHealthMetrics.map((metric, index) => (
                            <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">{metric.label}</span>
                                    <span className="font-medium">{metric.value}</span>
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
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Team Members</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Velocity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Focus</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Senior SDE</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                    <span>85%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Authentication Service</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">SDE II</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                    </div>
                                    <span>92%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Frontend Dashboard</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">On PTO</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
