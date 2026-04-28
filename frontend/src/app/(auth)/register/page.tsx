"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Register returns { user: {...}, access: "...", refresh: "..." }
      const res = await api.post("/accounts/register/", formData);
      const { access, user } = res.data;

      // Save to Zustand
      login(access, user);

      // Redirect
      router.push("/account");
    } catch (err: any) {
      if (err.response?.data) {
        // Simple error parsing
        const data = err.response.data;
        const msg = Object.values(data).flat().join(" ");
        setError(msg || "Registration failed. Please try again.");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center py-12 px-6">
      <div className="w-full max-w-md bg-background border border-border p-8 rounded-3xl shadow-sm">
        <h1 className="text-3xl font-bold tracking-tighter mb-2 text-center">Create Account</h1>
        <p className="text-muted-foreground text-center mb-8">Join LUXE to unlock exclusive perks.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input 
                type="text" 
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input 
                type="text" 
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              name="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-border rounded-xl px-4 py-3 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
              placeholder="Min. 8 characters"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-foreground text-background py-3.5 rounded-xl font-medium hover:bg-brand-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account? <Link href="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
