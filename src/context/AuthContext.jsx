import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  normalizeRole,
} from "../services/authService";

const AuthContext = createContext(null);

/* =========================================================
   STORAGE HELPERS
========================================================= */

const getStoredUser = () => {
  try {
    const savedUser =
      localStorage.getItem("complaintUser") ||
      localStorage.getItem("authUser");

    if (!savedUser) return null;

    return JSON.parse(savedUser);
  } catch (error) {
    console.error("Could not read saved user:", error);
    return null;
  }
};

const saveLoggedInUser = (userData) => {
  try {
    localStorage.setItem(
      "complaintUser",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "authUser",
      JSON.stringify(userData)
    );
  } catch (error) {
    console.error("Could not save logged in user:", error);
  }
};

const removeLoggedInUser = () => {
  try {
    localStorage.removeItem("complaintUser");
    localStorage.removeItem("authUser");
  } catch (error) {
    console.error("Could not remove logged in user:", error);
  }
};

/* =========================================================
   USER NORMALIZATION
========================================================= */

const normalizeUser = (userData) => {
  if (!userData) return null;

  return {
    ...userData,

    id: userData.id || userData._id || null,

    role: normalizeRole(userData.role),

    rewardPoints:
      Number(userData.rewardPoints || 0),

    resolvedComplaints:
      Number(userData.resolvedComplaints || 0),

    lastReward:
      userData.lastReward || null,
  };
};

/* =========================================================
   AUTH PROVIDER
========================================================= */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return getStoredUser();
  });

  /* =======================================================
     VERIFY EXISTING LOGIN ON PAGE REFRESH
  ======================================================= */

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) return;

    let mounted = true;

    const verifySession = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (!mounted) return;

        const finalUser = normalizeUser(currentUser);

        setUser(finalUser);
        saveLoggedInUser(finalUser);

        console.log(
          "SESSION VERIFIED:",
          finalUser
        );
      } catch (error) {
        console.error(
          "Session verification failed:",
          error.message
        );

        localStorage.removeItem("authToken");
        removeLoggedInUser();

        if (mounted) {
          setUser(null);
        }
      }
    };

    verifySession();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     LOGIN
  ======================================================= */

  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      console.log(
        "BACKEND LOGIN ATTEMPT:",
        cleanEmail
      );

      const result = await loginUser(
        cleanEmail,
        cleanPassword
      );

      const finalUser = normalizeUser(
        result.user
      );

      setUser(finalUser);
      saveLoggedInUser(finalUser);

      console.log(
        "BACKEND LOGIN SUCCESS:",
        finalUser
      );

      return {
        success: true,
        user: finalUser,
        token: result.token,
      };
    } catch (error) {
      console.error(
        "BACKEND LOGIN FAILED:",
        error.message
      );

      return {
        success: false,
        message:
          error.message ||
          "Invalid email or password",
      };
    }
  };

  /* =======================================================
     REGISTER
  ======================================================= */

  const register = async (userData) => {
    try {
      console.log(
        "BACKEND REGISTER ATTEMPT:",
        userData.email
      );

      const result = await registerUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,

        // Public registration creates Citizen accounts.
        role: "Citizen",
      });

      /*
        Backend register returns a token.
        We intentionally clear it so user goes to Login
        after registration.
      */

      logoutUser();
      removeLoggedInUser();

      setUser(null);

      const createdUser = normalizeUser(
        result.user
      );

      console.log(
        "BACKEND REGISTRATION SUCCESS:",
        createdUser
      );

      return {
        success: true,
        user: createdUser,
        message:
          "Registration successful. Please login.",
      };
    } catch (error) {
      console.error(
        "BACKEND REGISTRATION FAILED:",
        error.message
      );

      return {
        success: false,
        message:
          error.message ||
          "Registration failed",
      };
    }
  };

  /* =======================================================
     UPDATE USER
     
     Kept locally for existing Profile UI.
     Backend profile update API can be connected later.
  ======================================================= */

  const updateUser = (updatedData) => {
    if (!user) {
      return {
        success: false,
        message: "User not logged in",
      };
    }

    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);
    saveLoggedInUser(updatedUser);

    return {
      success: true,
      user: updatedUser,
    };
  };

  /* =======================================================
     REWARD POINTS
  ======================================================= */

  const addRewardPoints = (
    points,
    reason = ""
  ) => {
    if (!user) return;

    const currentPoints =
      Number(user.rewardPoints || 0);

    const updatedUser = {
      ...user,

      rewardPoints:
        currentPoints + Number(points),

      lastReward: {
        points: Number(points),
        reason,
        date: new Date().toLocaleString(),
      },
    };

    setUser(updatedUser);
    saveLoggedInUser(updatedUser);
  };

  /* =======================================================
     RESET REWARDS
  ======================================================= */

  const resetRewards = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      rewardPoints: 0,
      resolvedComplaints: 0,
      lastReward: null,
    };

    setUser(updatedUser);
    saveLoggedInUser(updatedUser);

    window.dispatchEvent(
      new Event("rewardReset")
    );
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = () => {
    logoutUser();
    removeLoggedInUser();

    localStorage.removeItem("registeredUser");

    setUser(null);

    console.log("USER LOGGED OUT");
  };

  /* =======================================================
     AUTH CONTEXT
  ======================================================= */

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        updateUser,
        addRewardPoints,
        resetRewards,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================================================
   USE AUTH
========================================================= */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthContext;