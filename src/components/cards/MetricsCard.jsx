export default function MetricsCard({ title, metrics }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
            <div className="space-y-4">
                {metrics.map((metric, index) => (
                    <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">{metric.label}</span>
                            <span className="font-medium">{metric.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`${metric.color} h-2 rounded-full`}
                                style={{ width: metric.percentage }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
