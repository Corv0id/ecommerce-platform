import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { accountApi } from '@/lib/api';

interface Address {
  id: string;
  line1: string;
  line2: string;
  city: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  addresses?: Address[];
  wishlist?: any[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  setToken: (token: string) => void;
  fetchProfile: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (token, user) => {
        set({ token, user, isAuthenticated: true });
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
      setToken: (token) => set({ token, isAuthenticated: true }),
      fetchProfile: async () => {
        try {
          const [profileRes, wishlistRes] = await Promise.all([
            accountApi.getProfile(),
            accountApi.getWishlist()
          ]);
          set({ user: { ...profileRes.data, wishlist: wishlistRes.data } });
        } catch (error) {
          console.error("Failed to fetch profile data", error);
        }
      },
      updateUser: (data) => set((state) => ({ user: state.user ? { ...state.user, ...data } : null })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
