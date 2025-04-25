import React from "react";

const mockPendingItems = [
    {
        id: 1,
        title: "Update SIM data for System X",
        assignedTo: "Alice Johnson",
        dueDate: "2025-04-30",
    },
    {
        id: 2,
        title: "Review monthly summary draft",
        assignedTo: "Bob Smith",
        dueDate: "2025-04-28",
    },
    {
        id: 3,
        title: "Send feedback to Project Y team",
        assignedTo: "Charlie Lee",
        dueDate: "2025-05-02",
    },
];

const PendingActions = () => {
    return (
        <div className="bg-white shadow-sm p-6 rounded-md ">
            {/*<div className="flex items-center justify-between mb-4">*/}
            {/*    <h2 className="text-base font-medium text-gray-700">Pending Action Items</h2>*/}
            {/*</div>*/}
            <ul className="divide-y divide-gray-200">
                {mockPendingItems.map((item) => (
                    <li key={item.id} className="py-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                                <p className="text-sm text-gray-500">Assigned to {item.assignedTo}</p>
                            </div>
                            {/*<p className="text-sm text-red-500 font-medium">*/}
                            {/*    Due: {item.dueDate}*/}
                            {/*</p>*/}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PendingActions;
