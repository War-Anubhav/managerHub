import { useSelector } from 'react-redux';

const DashboardHighlights = () => {
    const highlights = useSelector((state) => state.dashboard.highlights);

    return (
        <div className="bg-white rounded shadow p-4">
            {/*<h2 className="text-xl font-semibold mb-2">Highlights / Actions</h2>*/}
            <ul className="list-disc ml-5 space-y-1">
                {highlights.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardHighlights;
