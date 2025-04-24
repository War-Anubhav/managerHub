import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManagerDashboard from './pages/ManagerDashboard';
import TeamSummary from './pages/ManagerDashboard/TeamSummary';
import ProjectSummary from './pages/ManagerDashboard/ProjectSummary';
import IndividualReports from './pages/ManagerDashboard/IndividualReports';
import MemberReport from './pages/ManagerDashboard/MemberReport';
import TeamSummaryOverview from "./pages/ManagerDashboard/TeamSummaryOverview.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ManagerDashboard />} />
                <Route path="/manager/team-summary" element={<TeamSummary />} />
                <Route path="/manager/project-summary" element={<ProjectSummary />} />
                <Route path="/manager/individual-reports" element={<IndividualReports />} />
                <Route path="/manager/individual-reports/:email" element={<MemberReport />} />
                <Route path="/manager/team-overview" element={<TeamSummaryOverview />} />
            </Routes>
        </Router>
    );
}


export default App;
