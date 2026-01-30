import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import IdeaInput from '../components/IdeaInput';
import WelcomeScreen from '../components/WelcomeScreen';
import ChatMessage from '../components/ChatMessage';
import Sidebar from '../components/Sidebar';
import SettingsView from '../components/SettingsView';
import TermsView from '../components/TermsView';
import ThinkingIndicator from '../components/ThinkingIndicator';
import SkeletonLoader from '../components/SkeletonLoader';
import { generateInnovations } from '../services/geminiService';
import { AppState, ChatMessage as ChatMessageType } from '../types';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [inputPlaceholder, setInputPlaceholder] = useState<string>('');
    const [currentView, setCurrentView] = useState<'chat' | 'settings' | 'terms'>('chat');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Handle mobile resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Init
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    useEffect(() => {
        if (currentView === 'chat') {
            scrollToBottom();
        }
    }, [messages, appState, currentView]);

    const handleGenerate = async (text: string) => {
        const userMsg: ChatMessageType = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setAppState(AppState.LOADING);
        setInputPlaceholder('');

        try {
            const results = await generateInnovations(text);
            const aiMsg: ChatMessageType = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                suggestions: results,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, aiMsg]);
            setAppState(AppState.IDLE);
        } catch (error) {
            console.error(error);
            setAppState(AppState.ERROR);
        }
    };

    const handleExampleClick = (text: string) => {
        setInputPlaceholder(text);
    };

    const handleNewChat = () => {
        setCurrentView('chat');
        setMessages([]);
        setAppState(AppState.IDLE);
        if (window.innerWidth < 768) setIsSidebarOpen(false);
    };

    const handleRefine = (text: string) => {
        setInputPlaceholder(text);
    };

    const handleFollowUp = (text: string) => {
        handleGenerate(text);
    };

    // If viewing terms, show it regardless
    if (currentView === 'terms') {
        return <TermsView onBack={() => setCurrentView('chat')} />;
    }

    // Construct user object for Sidebar
    const sidebarUser = user ? {
        name: user.displayName || 'User', // Fallback or fetch from DB if needed
        email: user.email || '',
        avatar: user.photoURL || undefined
    } : null;

    return (
        <div className="h-screen flex bg-white text-slate-900 font-sans overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                onNewChat={handleNewChat}
                onLogout={logout}
                onSettings={() => {
                    setCurrentView('settings');
                    if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className="flex-shrink-0"
                user={sidebarUser}
            />

            <div className="flex-1 flex flex-col h-full relative min-w-0">
                <Header
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    isSidebarOpen={isSidebarOpen}
                />

                {currentView === 'settings' ? (
                    <SettingsView onBack={() => setCurrentView('chat')} />
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto scroll-smooth">
                            {messages.length === 0 ? (
                                <WelcomeScreen onExampleClick={handleExampleClick} />
                            ) : (
                                <div className="flex flex-col pb-4">
                                    {messages.map((msg) => (
                                        <ChatMessage
                                            key={msg.id}
                                            message={msg}
                                            onRefine={handleRefine}
                                            onFollowUp={handleFollowUp}
                                        />
                                    ))}

                                    {appState === AppState.LOADING && (
                                        <div className="bg-slate-50/50">
                                            <ThinkingIndicator />
                                            <SkeletonLoader />
                                        </div>
                                    )}

                                    {appState === AppState.ERROR && (
                                        <div className="w-full py-4">
                                            <div className="max-w-xl mx-auto px-4">
                                                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                                                    <AlertCircle className="w-5 h-5 text-red-500" />
                                                    <p className="text-red-700 text-sm">Something went wrong. Please try again.</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        <IdeaInput
                            onSubmit={handleGenerate}
                            isLoading={appState === AppState.LOADING}
                            placeholder={inputPlaceholder}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
