"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Fetch Tokens
      const tokenRes = await api.post("/accounts/token/", { email, password });
      const { access } = tokenRes.data;

      // 2. Fetch User Profile
      // The API interceptor is not yet guaranteed to have the token for THIS next call 
      // if we rely on Zustand state updates to propagate, so we pass it explicitly:
      const userRes = await api.get("/accounts/me/", {
        headers: { Authorization: `Bearer ${access}` }
      });
      
      const user = userRes.data;

      // 3. Save to Zustand
      login(access, user);

      // 4. Redirect
      router.push("/account");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-6">
      <div className="w-full max-w-md bg-background border border-border p-8 rounded-3xl shadow-sm">
        <h1 className="text-3xl font-bold tracking-tighter mb-2 text-center">Welcome Back</h1>
        <p className="text-muted-foreground text-center mb-8">Sign in to access your luxury account.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Password</label>
              <Link href="#" className="text-sm text-brand-600 hover:underline">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-foreground text-background py-3.5 rounded-xl font-medium hover:bg-brand-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don't have an account? <Link href="/register" className="text-brand-600 font-medium hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
