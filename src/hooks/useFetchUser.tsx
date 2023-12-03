import { useState, useEffect, useCallback } from "react";
import User from "../models/user";

interface UserState {
  userData: User | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchUser = () => {
  // define our states for handeling data, loading, error
  // init States
  const [state, setState] = useState<UserState>({
    userData: null,
    isLoading: false,
    error: null,
  });

  const fetchUser = useCallback(async () => {
    const apiUrl = process.env.APP_API_URL || "https://randomuser.me/api/";
    // Start loading and reset error state
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }));

    try {
      const response = await fetch(apiUrl);

      // throw an error if our reposne was not in 2XX range
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      const user = data.results[0];

      setState((prevState) => ({
        ...prevState,
        userData: {
          firstName: user.name.first,
          lastName: user.name.last,
          country: user.location.country,
          picture: user.picture.large,
        },
        isLoading: false,
      }));
    } catch (err) {
      // loading process ended - loaded
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error: (err as { message?: string }).message || "Something went wrong!",
      }));
    }
  }, []);

  // useEffect hook for our side effect Fetch API call
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const { userData, isLoading, error } = state;

  return {
    fetchUser,
    userData,
    isLoading,
    error,
  };
};

export default useFetchUser;
