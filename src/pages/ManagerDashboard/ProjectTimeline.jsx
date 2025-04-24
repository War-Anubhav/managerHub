const ProjectTimeline = () => {
    return (
        <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Project Timeline</h2>
            <ul className="text-sm text-gray-700 space-y-1">
                <li><strong>System X</strong>: Jan 1 - Feb 26</li>
                <li><strong>Rembrandt</strong>: Jan 1 - Feb 11</li>
                <li><strong>Self Invoicing</strong>: Apr 1 - Jun 10</li>
                <li><strong>Full CI/CD</strong>: Jul 1 - Sep 30</li>
            </ul>
        </div>
    );
};
export default ProjectTimeline;
