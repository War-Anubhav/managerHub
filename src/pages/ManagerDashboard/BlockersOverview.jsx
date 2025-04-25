const BlockersOverview = () => {
    return (
        <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Blockers Overview</h2>
            <ul className="text-sm  space-y-1">
                <li>Daisy is blocked on data access for analytics integration</li>
                <li>Emily's project waiting for legal API compliance</li>
                <li>Legacy service migration blocked due to missing credentials</li>
            </ul>
        </div>
    );
};
export default BlockersOverview;


{/*
import React, { useState, useEffect } from 'react';
import { Lambda } from '@aws-sdk/client-lambda';

function parseTaskData(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        const bodyData = JSON.parse(parsed.body);
        const headers = bodyData.headers;
        const tasksObj = bodyData.tasks;
        const tasksArray = Object.values(tasksObj);

        const formattedTasks = tasksArray.map(task => {
            const cleanTask = {};
            headers.forEach(header => {
                if (task[header]) {
                    cleanTask[header] = task[header].replace(/\u200b/g, '').trim();
                    if (cleanTask[header] === '') cleanTask[header] = null;
                } else {
                    cleanTask[header] = null;
                }
            });
            return cleanTask;
        });

        return {
            title: bodyData.title,
            tasks: formattedTasks
        };
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}

const BlockersOverview = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const lambda = new Lambda({
            region: 'us-east-1',
            credentials: {
                accessKeyId: "",
                secretAccessKey: ""
            }
        });

        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                const payload = { thread_id: "SLX7AxbusceY" };

                const params = {
                    FunctionName: 'QuipIntegration',
                    InvocationType: 'RequestResponse',
                    Payload: JSON.stringify(payload)
                };

                const response = await lambda.invoke(params);
                const responseText = new TextDecoder().decode(response.Payload);
                const tasksData = parseTaskData(responseText);

                if (!tasksData || !Array.isArray(tasksData.tasks)) {
                    throw new Error("Invalid task data format");
                }

                const blockedTasks = tasksData.tasks
                    .filter(task => task.Progress?.toLowerCase() === "blocked")
                    .map(task => task.Task);

                if (blockedTasks.length > 0) {
                    console.log("Blocked Tasks:");
                    blockedTasks.forEach(task => console.log(`🚫 ${task} is blocked.`));
                } else {
                    console.log("✅ No tasks are blocked.");
                }

                setTasks(tasksData.tasks);
                setLoading(false);
            } catch (err) {
                console.error("Error invoking Lambda:", err);
                setError('Failed to fetch data: ' + err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="bg-white border rounded p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Blockers Overview</h2>
            {tasks.filter(task => task.Progress?.toLowerCase() === "blocked").length === 0 ? (
                <p className="text-green-600">✅ No tasks are blocked.</p>
            ) : (
                <ul className="list-disc pl-5 text-red-600">
                    {tasks
                        .filter(task => task.Progress?.toLowerCase() === "blocked")
                        .map((task, index) => (
                            <li key={index}>🚫 {task.Task} is blocked.</li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default BlockersOverview;
*/}