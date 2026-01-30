import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, AlertCircle, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import AppLogo from '../components/AppLogo';

const SignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signup, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, authLoading, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setLoading(false); // Reset loading on validation failure
            return setError('Passwords do not match');
        }
        if (formData.password.length < 6) {
            setLoading(false); // Reset loading on validation failure
            return setError('Password must be at least 6 characters');
        }

        setLoading(true);
        try {
            const { email, password, name } = formData;
            await signup(email, password, { name });
            navigate('/');
        } catch (err: any) {
            console.error('Signup error:', err);
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('Email is already registered');
                    break;
                case 'auth/invalid-email':
                    setError('Invalid email address');
                    break;
                case 'auth/weak-password':
                    setError('Password is too weak');
                    break;
                default:
                    setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 sm:p-6">
            <div className="w-full max-w-[440px] bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 sm:p-12 space-y-8 animate-in zoom-in-95 duration-500">

                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <AppLogo className="w-14 h-14 rounded-2xl shadow-sm border border-slate-100" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Create Account
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            Join Micro-Innovation Advisor
                        </p>
                    </div>
                </div>

                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 text-xs animate-in slide-in-from-top-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all outline-none text-sm"
                                placeholder="Student Name"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all outline-none text-sm"
                                placeholder="student@university.edu"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all outline-none text-sm"
                                placeholder="••••••••"
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-slate-400 focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-slate-400 focus:bg-white transition-all outline-none text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-sm disabled:opacity-70 flex justify-center items-center"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-xs text-slate-500">
                        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
