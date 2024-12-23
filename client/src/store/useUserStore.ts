import { IUser } from "@/lib/interfaces";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export interface IUserStore {
  user: IUser | null;
  signUpLoading: boolean;
  loginLoading: boolean;
  checkAuthLoading: boolean;
  checkingAuth: boolean;

  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  googleLogin: () => Promise<void>;
  githubLogin: () => Promise<void>;
}

export const userUserStore = create<IUserStore>((set) => ({
  user: null,
  signUpLoading: false,
  loginLoading: false,
  checkAuthLoading: false,
  checkingAuth: true,

  signup: async (username, email, password) => {
    set({ signUpLoading: true });

    if (!username || !email || !password) {
      toast.error("All fields are required");
      set({ signUpLoading: false });
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/signup", {
        username,
        email,
        password,
      });
      set({ user: res.data.user, signUpLoading: false, checkingAuth: false });

      toast.success("Account created successfully");
    } catch (error: unknown) {
      console.error(error);
      set({ signUpLoading: false, checkingAuth: false });
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    } finally {
      set({ signUpLoading: false, checkingAuth: false });
    }
  },

  login: async (email, password) => {

    set({ loginLoading: false });

     if(!email || !password){
        return;
    }

    try {
        const res = await axiosInstance.post('/auth/login', {
            email,
            password
        })

        set({ user: res.data.data, loginLoading: false, checkingAuth: false})


    } catch (error: unknown) {
        console.error(`Error while signing in ${error}`);
      set({ signUpLoading: false });
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
        
    } finally {
        set({ loginLoading: false });
    }
  },

  logout: async () => {

    try {
        await axiosInstance.post('/auth/logout')
        set({ user: null, checkingAuth: false });
    } catch (error: unknown) {
        console.error(error);
      set({ loginLoading: false });
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      toast.error(axiosError.response?.data?.message || "Something went wrong");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true, checkAuthLoading: true });

    try {
        const res = await axiosInstance.get('/auth/profile');
        set({ user: res.data.data, checkingAuth: false, checkAuthLoading: false });
    } catch (error) {
        console.error(error);
      set({ user: null, checkingAuth: false, checkAuthLoading: false });
        
    }finally{
        set({checkingAuth: false, checkAuthLoading: false})
    }
  },

  googleLogin: async () => {
    window.location.href = 'http://localhost:5001/api/auth/google';
  },

githubLogin: async () => {
    window.location.href = 'http://localhost:5001/api/auth/github';
  },


}));
