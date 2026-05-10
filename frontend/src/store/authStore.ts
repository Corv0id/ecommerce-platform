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
  role?: string;
  addresses?: Address[];
  wishlist?: any[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  setToken: (token: string) => void;
  fetchProfile: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  toggleWishlist: (productId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),
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
      toggleWishlist: async (productId: string) => {
        const { user } = useAuthStore.getState();
        if (!user) return;

        const wishlistItem = user.wishlist?.find((item) => String(item.product) === String(productId));
        try {
          if (wishlistItem) {
            await accountApi.removeFromWishlist(wishlistItem.id);
          } else {
            await accountApi.addToWishlist(productId);
          }
          // Refresh profile to get updated wishlist
          const [profileRes, wishlistRes] = await Promise.all([
            accountApi.getProfile(),
            accountApi.getWishlist()
          ]);
          set({ user: { ...profileRes.data, wishlist: wishlistRes.data } });
        } catch (error) {
          console.error("Failed to toggle wishlist", error);
        }
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
