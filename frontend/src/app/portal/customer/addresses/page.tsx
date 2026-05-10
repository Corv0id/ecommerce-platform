"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { MapPin, Plus, Star, Trash2, Edit2 } from "lucide-react";

export default function CustomerAddressesPage() {
  const { user, fetchProfile } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [addressForm, setAddressForm] = useState({
    line1: "",
    line2: "",
    city: "",
    postal_code: "",
    country: "Tunisia",
    is_default: false
  });

  const addresses = user?.addresses || [];

  const openModal = (address: any = null) => {
    if (address) {
      setEditingAddress(address);
      setAddressForm({
        line1: address.line1,
        line2: address.line2 || "",
        city: address.city,
        postal_code: address.postal_code,
        country: address.country,
        is_default: address.is_default
      });
    } else {
      setEditingAddress(null);
      setAddressForm({
        line1: "",
        line2: "",
        city: "",
        postal_code: "",
        country: "Tunisia",
        is_default: addresses.length === 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { accountApi } = await import("@/lib/api");
      if (editingAddress) {
        await accountApi.updateAddress(editingAddress.id, addressForm);
      } else {
        await accountApi.addAddress(addressForm);
      }
      await fetchProfile();
      closeModal();
    } catch (err) {
      alert("Failed to save address.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;
    try {
      const { accountApi } = await import("@/lib/api");
      await accountApi.deleteAddress(id);
      await fetchProfile();
    } catch (err) {
      alert("Failed to delete address.");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const { accountApi } = await import("@/lib/api");
      await accountApi.updateAddress(id, { is_default: true });
      await fetchProfile();
    } catch (err) {
      alert("Failed to set default address.");
    }
  };

  return (
    <div className="max-w-5xl animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Delivery Addresses</h1>
          <p className="text-neutral-500 mt-2">Manage where your luxury items are shipped.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-900 transition-colors w-fit"
        >
          <Plus className="w-5 h-5" />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div 
            key={address.id} 
            className={`bg-white rounded-2xl border ${address.is_default ? 'border-brand-500 shadow-md ring-1 ring-brand-500/20' : 'border-neutral-200 shadow-sm'} p-6 relative flex flex-col`}
          >
            {address.is_default && (
              <div className="absolute -top-3 -right-3 bg-brand-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                <Star className="w-4 h-4 fill-current" />
              </div>
            )}
            
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500 shrink-0 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-neutral-900">{address.line1}</p>
                {address.line2 && <p className="text-neutral-600 mt-1">{address.line2}</p>}
                <p className="text-neutral-600 mt-1">{address.city}, {address.postal_code}</p>
                <p className="text-neutral-600 mt-1 font-medium">{address.country}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between">
              {!address.is_default ? (
                <button 
                  onClick={() => handleSetDefault(address.id)}
                  className="text-sm font-medium text-brand-600 hover:text-brand-800"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  Default Address
                </span>
              )}
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => openModal(address)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(address.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-16 text-center">
          <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No addresses found</h3>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto">
            You haven't saved any delivery addresses yet. Add one now to speed up your checkout process.
          </p>
          <button 
            onClick={() => openModal()}
            className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-900 transition-colors"
          >
            Add Address
          </button>
        </div>
      )}

      {/* Address Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              {editingAddress ? "Edit Address" : "New Address"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-1">Street Address</label>
                <input 
                  type="text" 
                  required
                  value={addressForm.line1}
                  onChange={(e) => setAddressForm({...addressForm, line1: e.target.value})}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="123 Luxury Ave"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-1">Apartment, suite, etc. (optional)</label>
                <input 
                  type="text" 
                  value={addressForm.line2}
                  onChange={(e) => setAddressForm({...addressForm, line2: e.target.value})}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  placeholder="Apt 4B"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-1">City</label>
                  <input 
                    type="text" 
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="Tunis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-1">Postal Code</label>
                  <input 
                    type="text" 
                    required
                    value={addressForm.postal_code}
                    onChange={(e) => setAddressForm({...addressForm, postal_code: e.target.value})}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                    placeholder="1000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-1">Country</label>
                <input 
                  type="text" 
                  required
                  value={addressForm.country}
                  onChange={(e) => setAddressForm({...addressForm, country: e.target.value})}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-3 bg-neutral-50 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                  readOnly
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="defaultAddress"
                  checked={addressForm.is_default}
                  onChange={(e) => setAddressForm({...addressForm, is_default: e.target.checked})}
                  className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500 border-neutral-300 cursor-pointer"
                />
                <label htmlFor="defaultAddress" className="text-sm font-medium text-neutral-900 cursor-pointer">
                  Set as default shipping address
                </label>
              </div>

              <div className="flex gap-4 pt-6 mt-4 border-t border-neutral-100">
                <button 
                  type="button" 
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 rounded-xl font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-900 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
