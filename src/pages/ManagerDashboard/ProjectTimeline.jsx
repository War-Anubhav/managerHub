import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ProjectTimeline = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const projectRanges = [
        { name: 'System X', start: new Date('2025-01-01'), end: new Date('2025-03-15'), color: 'bg-blue-500' },
        { name: 'Rembrandt', start: new Date('2025-02-01'), end: new Date('2025-04-20'), color: 'bg-red-500' },
        { name: 'Self Invoicing', start: new Date('2025-03-10'), end: new Date('2025-06-10'), color: 'bg-green-500' },
        { name: 'Full CI/CD', start: new Date('2025-05-01'), end: new Date('2025-09-30'), color: 'bg-purple-500' },
    ];

    const tileContent = ({ date }) => {
        const matched = projectRanges.filter(pr => date >= pr.start && date <= pr.end);
        if (matched.length === 0) return null;

        return (
            <div className="mt-1 space-y-0.5 w-full">
                {matched.map((m, idx) => (
                    <div
                        key={idx}
                        className={`rounded px-1 text-[10px] font-medium text-white truncate ${m.color}`}
                        style={{ fontSize: '0.7rem', lineHeight: '1rem', width: '100%' }}
                        title={m.name}
                    >
                        {m.name}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Project Calendar Timeline</h2>
            <div className="overflow-x-auto">
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileContent={tileContent}
                    tileClassName={() => '!h-28 !w-28 p-1 border border-gray-200 rounded-lg text-xs'}
                    className="w-full max-w-full"
                />
            </div>
            <style>{`
                .react-calendar {
                    width: 100%;
                    background: white;
                    border: none;
                    font-family: 'Inter', sans-serif;
                    line-height: 1.125em;
                }
                .react-calendar__tile {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    justify-content: flex-start;
                    padding: 0.5rem;
                    font-size: 0.75rem;
                    height: 100%;
                }
                .react-calendar__tile abbr {
                    font-size: 0.75rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }
                .react-calendar__month-view__days {
                    display: grid !important;
                    grid-template-columns: repeat(7, minmax(100px, 1fr));
                    gap: 8px;
                }
                .react-calendar__month-view__weekdays {
                    display: grid !important;
                    grid-template-columns: repeat(7, minmax(100px, 1fr));
                    gap: 8px;
                    margin-bottom: 0.5rem;
                }
                .react-calendar__month-view__weekdays__weekday {
                    font-weight: bold;
                    text-align: center;
                    font-size: 0.8rem;
                    padding-bottom: 0.25rem;
                    border-bottom: 1px dashed #999;
                }
                .react-calendar__navigation {
                    margin-bottom: 1rem;
                    justify-content: space-between;
                }
            `}</style>
        </div>
    );
};

export default ProjectTimeline;