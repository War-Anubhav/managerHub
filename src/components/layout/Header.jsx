import { User } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-indigo-700 text-white p-4 shadow-md">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">AI Powered Manager Hub</h1>
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-indigo-600">
                        <User size={20} />
                    </button>
                    <span>Manager Name</span>
                </div>
            </div>
        </header>
    );
}
