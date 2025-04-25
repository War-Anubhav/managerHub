import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const TeamVerticalList = () => {
    const manager = useSelector((state) => state.team.manager);
    const reports = useSelector((state) => state.team.reports);
    const summaries = useSelector((state) => state.team.memberSummaries);

    return (
        <div className="bg-white p-4 rounded shadow max-w-md ml-auto">
            {/*<h2 className="text-xl font-semibold mb-4">Team Structure</h2>*/}
            <ul className="border-l-2 border-gray-300 pl-4 space-y-2">
                {manager && (
                    <li className="mb-2">
                        <div className="ml-2 font-bold text-gray-800">{manager.name}</div>
                        <div className="ml-2 text-sm text-gray-500">{manager.title}</div>
                    </li>
                )}
                {reports.map((member, index) => {
                    const summary = summaries[member.email];
                    return (
                        <li key={index} className="pl-4 border-l border-dashed border-gray-300 ml-2">
                            <div className="relative group w-fit">
                                <Link to={`/manager/individual-reports/${encodeURIComponent(member.email)}`}>
                                    <div
                                        className={`ml-2 hover:underline cursor-pointer ${
                                            member.blocked ? 'text-red-600 font-semibold' : 'text-gray-800'
                                        }`}
                                    >
                                        {member.name}
                                    </div>
                                </Link>

                                {/* Hover summary tooltip */}
                                {summary?.short_summary && (
                                    <div
                                        className="absolute left-0 top-full mt-1 -translate-x-full bg-gray-900 text-white text-xs p-2 rounded shadow-md w-64 z-50 opacity-0 group-hover:opacity-100 transition duration-200"
                                        style={{ whiteSpace: 'normal' }}
                                    >
                                        {summary.short_summary}
                                    </div>
                                )}
                            </div>

                            <div className="ml-2 text-sm text-gray-500">{member.title}</div>
                            {member.blocked && (
                                <div className="ml-2 text-xs text-red-600">⚠ Blocked</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default TeamVerticalList;
