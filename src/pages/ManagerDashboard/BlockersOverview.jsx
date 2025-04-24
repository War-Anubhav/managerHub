const BlockersOverview = () => {
    return (
        <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Blockers Overview</h2>
            <ul className="text-sm text-red-600 space-y-1">
                <li>Daisy is blocked on data access for analytics integration</li>
                <li>Emily's project waiting for legal API compliance</li>
                <li>Legacy service migration blocked due to missing credentials</li>
            </ul>
        </div>
    );
};
export default BlockersOverview;