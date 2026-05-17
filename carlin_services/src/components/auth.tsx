"use client"

import { useState } from "react";
import ErrorMessage from "./error";

interface AuthComponentProps {
    componentName: string;
    onFormSubmit: (formData: FormData) => Promise<any>;
}

export default function AuthComponent({ componentName, onFormSubmit }: AuthComponentProps) {
    const isSignUp = componentName === "sign_up";
    const headerTitle = isSignUp ? "Create Account" : "Welcome Back";
    const description = isSignUp ? "Join us today" : "Sign in to continue";
    const buttonText = isSignUp ? "Create Account" : "Sign In";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            const result = await onFormSubmit(formData);
            if (result?.error) {
                setError(result.error);
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.05)_25%,rgba(68,68,68,.05)_50%,transparent_50%,transparent_75%,rgba(68,68,68,.05)_75%,rgba(68,68,68,.05))] bg-[length:60px_60px]"></div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-md backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
                {/* Header */}
                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        {headerTitle}
                    </h1>
                    <p className="text-sm text-slate-400 font-light">
                        {description}
                    </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 mb-8">
                    {/* Email Field */}
                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-400/20"
                        />
                        <label
                            htmlFor="email"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${email || focusedField === "email"
                                ? "top-0 -translate-y-2 text-xs font-semibold text-blue-400"
                                : "top-3.5 text-sm text-slate-400"
                                }`}
                        >
                            Email
                        </label>
                        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-200 ${focusedField === "email" ? "w-full" : "w-0"}`}></div>
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-400/20"
                        />
                        <label
                            htmlFor="password"
                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${password || focusedField === "password"
                                ? "top-0 -translate-y-2 text-xs font-semibold text-blue-400"
                                : "top-3.5 text-sm text-slate-400"
                                }`}
                        >
                            Password
                        </label>
                        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-200 ${focusedField === "password" ? "w-full" : "w-0"}`}></div>
                    </div>

                    {/* Secret Code Field (Sign Up Only) */}
                    {isSignUp && (
                        <div className="relative group animate-in fade-in slide-in-from-top-2 duration-300">
                            <input
                                type="text"
                                id="secret_code"
                                name="secret_code"
                                value={secretCode}
                                onChange={(e) => setSecretCode(e.target.value)}
                                onFocus={() => setFocusedField("secret_code")}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Enter secret code"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-400/20"
                            />
                            <label
                                htmlFor="secret_code"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${secretCode || focusedField === "secret_code"
                                    ? "top-0 -translate-y-2 text-xs font-semibold text-blue-400"
                                    : "top-3.5 text-sm text-slate-400"
                                    }`}
                            >
                                Secret Code
                            </label>
                            <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-200 ${focusedField === "secret_code" ? "w-full" : "w-0"}`}></div>
                        </div>
                    )}
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 animate-in fade-in slide-in-from-top duration-200">
                        <ErrorMessage message={error} />
                    </div>
                )}

                {/* Remember Me / Terms */}
                <div className="flex items-center justify-between mb-8 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded bg-white/5 border border-white/10 checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-all duration-200 accent-blue-500"
                        />
                        <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
                            {isSignUp ? "I agree to terms" : "Remember me"}
                        </span>
                    </label>
                    {!isSignUp && (
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot password?
                        </a>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 active:scale-98 disabled:opacity-50 relative overflow-hidden group"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting && (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {buttonText}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>

                {/* Sign Up / Sign In Toggle */}
                <div className="mt-6 text-center text-sm text-slate-400">
                    {isSignUp ? (
                        <>
                            Already have an account?{" "}
                            <a href="/admin/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Sign in
                            </a>
                        </>
                    ) : (
                        <>
                            Don't have an account?{" "}
                            <a href="/admin/auth/sign_up" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Create one
                            </a>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}