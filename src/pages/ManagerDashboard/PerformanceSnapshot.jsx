const PerformanceSnapshot = () => {
    return (
        <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Performance Snapshot</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                <li>Team velocity up by 10%</li>
                <li>3 projects hit 100% completion rate</li>
                <li>95% sprint goals met this quarter</li>
            </ul>
        </div>
    );
};
export default PerformanceSnapshot;