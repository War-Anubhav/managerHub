import { useState } from 'react';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import IndividualSDESummary from './components/tabs/IndividualSDESummary.jsx';
import TeamSummary from './components/tabs/TeamSummary';
import ProjectSummary from './components/tabs/ProjectSummary';

export default function ManagerHub() {
    const [activeTab, setActiveTab] = useState('individual');

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />
            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                {activeTab === 'individual' && <IndividualSDESummary />}
                {activeTab === 'team' && <TeamSummary />}
                {activeTab === 'project' && <ProjectSummary />}
            </div>
        </div>
    );
}
