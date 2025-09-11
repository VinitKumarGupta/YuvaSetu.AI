interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

const USER_KEY = 'ys_user';

export const getUser = (): User | null => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return getUser() !== null;
};

// Mock OTP verification
export const sendOTP = async (phoneOrEmail: string): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return { success: true, message: 'OTP sent successfully' };
};

export const verifyOTP = async (phoneOrEmail: string, otp: string): Promise<{ success: boolean; user?: User }> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  
  // Mock verification - accept any 4-digit OTP
  if (otp.length === 4) {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: phoneOrEmail.includes('@') ? 'User' : 'User',
      ...(phoneOrEmail.includes('@') ? { email: phoneOrEmail } : { phone: phoneOrEmail })
    };
    return { success: true, user };
  }
  
  return { success: false };
};