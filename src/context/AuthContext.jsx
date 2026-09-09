import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("complaintUser");

    try {
      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      localStorage.removeItem("complaintUser");
      return null;
    }
  });

  // =========================================================
  // LOGIN
  // =========================================================

  const login = (email, password) => {
    const savedUser =
      localStorage.getItem("registeredUser");

    if (savedUser) {
      try {
        const userData =
          JSON.parse(savedUser);

        if (
          userData.email === email &&
          userData.password === password
        ) {
          const finalUser = {
            ...userData,

            rewardPoints:
              userData.rewardPoints || 0,

            resolvedComplaints:
              userData.resolvedComplaints || 0,
          };

          setUser(finalUser);

          localStorage.setItem(
            "complaintUser",
            JSON.stringify(finalUser)
          );

          return {
            success: true,
          };
        }
      } catch {
        localStorage.removeItem(
          "registeredUser"
        );
      }
    }

    // =====================================================
    // DEMO LOGIN
    // =====================================================

    if (
      email === "demo@gmail.com" &&
      password === "123456"
    ) {
      const demoUser = {
        name: "Demo User",
        email: "demo@gmail.com",
        mobile: "9876543210",
        city: "Solapur",
        address: "",
        rewardPoints: 0,
        resolvedComplaints: 0,
      };

      setUser(demoUser);

      localStorage.setItem(
        "complaintUser",
        JSON.stringify(demoUser)
      );

      localStorage.setItem(
        "registeredUser",
        JSON.stringify(demoUser)
      );

      return {
        success: true,
      };
    }

    return {
      success: false,
      message:
        "Invalid email or password",
    };
  };

  // =========================================================
  // REGISTER
  // =========================================================

  const register = (userData) => {
    const finalUser = {
      ...userData,

      rewardPoints: 0,

      resolvedComplaints: 0,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(finalUser)
    );

    localStorage.setItem(
      "complaintUser",
      JSON.stringify(finalUser)
    );

    setUser(finalUser);

    return {
      success: true,
    };
  };

  // =========================================================
  // UPDATE USER
  // =========================================================

  const updateUser = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "complaintUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );

    return {
      success: true,
    };
  };

  // =========================================================
  // ADD REWARD POINTS
  // =========================================================

  const addRewardPoints = (
    points,
    reason = ""
  ) => {
    if (!user) return;

    const currentPoints =
      user.rewardPoints || 0;

    const updatedUser = {
      ...user,

      rewardPoints:
        currentPoints + points,

      lastReward: {
        points,
        reason,
        date:
          new Date().toLocaleString(),
      },
    };

    setUser(updatedUser);

    localStorage.setItem(
      "complaintUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );
  };

  // =========================================================
  // RESET REWARDS
  // =========================================================

  const resetRewards = () => {
    if (!user) return;

    const updatedUser = {
      ...user,

      rewardPoints: 0,

      resolvedComplaints: 0,

      lastReward: null,
    };

    setUser(updatedUser);

    localStorage.setItem(
      "complaintUser",
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(updatedUser)
    );
  };

  // =========================================================
  // CROSS-COMPONENT REWARD RESET
  // =========================================================

  useEffect(() => {
    const handleRewardReset = () => {
      const savedUser =
        localStorage.getItem(
          "complaintUser"
        );

      if (!savedUser) return;

      try {
        setUser(
          JSON.parse(savedUser)
        );
      } catch {
        setUser(null);
      }
    };

    window.addEventListener(
      "rewardReset",
      handleRewardReset
    );

    return () => {
      window.removeEventListener(
        "rewardReset",
        handleRewardReset
      );
    };
  }, []);

  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    setUser(null);

    localStorage.removeItem(
      "complaintUser"
    );
  };

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

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}