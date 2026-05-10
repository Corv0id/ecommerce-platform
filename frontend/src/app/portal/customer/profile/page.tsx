"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { User, Mail, Phone } from "lucide-react";

export default function CustomerProfilePage() {
  const { user, fetchProfile } = useAuthStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const { accountApi } = await import("@/lib/api");
      await accountApi.updateProfile({ first_name: firstName, last_name: lastName });
      await fetchProfile();
      // In a real app, use a proper toast notification system here
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Personal Information</h1>
        <p className="text-neutral-500 mt-2">Update your personal details and how we can reach you.</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-100 flex items-center gap-6">
          <div className="w-20 h-20 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-2xl font-bold uppercase shadow-sm">
            {firstName?.[0] || ""}{lastName?.[0] || email?.[0]}
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{firstName} {lastName}</h2>
            <p className="text-neutral-500 flex items-center gap-2 mt-1">
              <Mail className="w-4 h-4" /> {email}
            </p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-500" /> First Name
                </label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-500" /> Last Name
                </label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neutral-500" /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-100 text-neutral-500 cursor-not-allowed outline-none"
                />
                <p className="text-xs text-neutral-500 mt-1">Email cannot be changed directly.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-900 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neutral-500" /> Phone Number
                </label>
                <input 
                  type="tel" 
                  disabled
                  value="+216 00 000 000"
                  className="w-full border border-neutral-200 rounded-xl px-4 py-3 bg-neutral-100 text-neutral-500 cursor-not-allowed outline-none"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-100 flex justify-end">
              <button 
                type="submit" 
                disabled={isUpdating}
                className="bg-neutral-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-900 transition-colors disabled:opacity-50"
              >
                {isUpdating ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
