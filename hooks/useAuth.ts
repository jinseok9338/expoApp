import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (token: string) => {
    await AsyncStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
    router.replace("/(main)");
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    router.replace("/");
  };

  return {
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
  };
};
