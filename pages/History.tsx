import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserSuggestions, deleteSuggestion, SavedSuggestion } from '../services/suggestionsService';
import { ArrowLeft, Trash2, Clock, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

const History: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState<SavedSuggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!user) return;

            try {
                setLoading(true);
                const data = await getUserSuggestions(user.uid);
                setSuggestions(data);
            } catch (err) {
                console.error('Error fetching suggestions:', err);
                setError('Failed to load history. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, [user]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this saved suggestion?')) return;

        try {
            setDeleting(id);
            await deleteSuggestion(id);
            setSuggestions(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            console.error('Error deleting:', err);
            setError('Failed to delete. Please try again.');
        } finally {
            setDeleting(null);
        }
    };

    const formatDate = (timestamp: any) => {
        if (!timestamp) return 'Just now';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900">Suggestion History</h1>
                        <p className="text-xs text-slate-500">{suggestions.length} saved sessions</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-6">
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
                    </div>
                ) : suggestions.length === 0 ? (
                    <div className="text-center py-12">
                        <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h2 className="text-lg font-semibold text-slate-700 mb-2">No saved suggestions yet</h2>
                        <p className="text-sm text-slate-500 mb-4">
                            Save your favorite micro-innovation sessions to revisit them later.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Get Started
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {suggestions.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{formatDate(item.createdAt)}</span>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        disabled={deleting === item.id}
                                        className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                    >
                                        {deleting === item.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <p className="text-sm text-slate-700 font-medium mb-3 line-clamp-2">
                                    "{item.inputText}"
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {item.suggestions.slice(0, 3).map((s, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-medium"
                                        >
                                            {s.title}
                                        </span>
                                    ))}
                                    {item.suggestions.length > 3 && (
                                        <span className="px-2 py-1 bg-slate-100 text-slate-500 text-xs rounded-md">
                                            +{item.suggestions.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
