import { useSelector } from 'react-redux';

const TeamInsights = () => {
    const highlights = useSelector((state) => state.dashboard.highlights);

    const blockers = [
        "Daisy is blocked on data access for analytics integration",
        "Emily's project waiting for legal API compliance",
        "Legacy service migration blocked due to missing credentials"
    ];

    return (
        <div className="bg-white p-6 shadow-sm rounded-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-gray-700">Team Insights</h2>
            </div>
            <div className="text-sm text-gray-600 mb-6">Highlights and blockers overview</div>

            <div className="space-y-6">
                {/* Highlights */}
                <div>
                    <h3 className="text-sm font-semibold text-green-700 mb-2">🌟 Highlights</h3>
                    {highlights.length ? (
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside bg-green-50 border border-green-200 p-3 rounded-md">
                            {highlights.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-sm text-gray-500 italic">No highlights available.</div>
                    )}
                </div>

                {/* Blockers */}
                <div>
                    <h3 className="text-sm font-semibold text-red-700 mb-2">🚧 Blockers</h3>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside bg-red-50 border border-red-200 p-3 rounded-md">
                        {blockers.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamInsights;
