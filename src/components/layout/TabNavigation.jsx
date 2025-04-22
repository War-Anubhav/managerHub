import { User, Users, Kanban } from 'lucide-react';

export default function TabNavigation({ activeTab, setActiveTab }) {
    return (
        <div className="flex border-b border-gray-200 bg-white shadow-sm">
            <button
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                    activeTab === 'individual'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('individual')}
            >
                <User size={18} className="mr-2" />
                Individual SDE Summary
            </button>
            <button
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                    activeTab === 'team'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('team')}
            >
                <Users size={18} className="mr-2" />
                Team Summary
            </button>
            <button
                className={`px-6 py-3 text-sm font-medium flex items-center ${
                    activeTab === 'project'
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('project')}
            >
                <Kanban size={18} className="mr-2" />
                Project Summary
            </button>
        </div>
    );
}
