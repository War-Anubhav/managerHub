export default function StatusCard({ title, children, footer }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
            {children}
            {footer && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    {footer}
                </div>
            )}
        </div>
    );
}
