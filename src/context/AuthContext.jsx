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

const USER_KEY = "complaintUser";
const AUTH_USER_KEY = "authUser";
const TOKEN_KEY = "authToken";

const getStoredUser = () => {
  try {
    const saved =
      localStorage.getItem(USER_KEY) ||
      localStorage.getItem(AUTH_USER_KEY);

    if (!saved) return null;

    return JSON.parse(saved);
  } catch (error) {
    console.error("Stored user error:", error);
    return null;
  }
};

const saveUser = (user) => {
  if (!user) return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

const clearAuthStorage = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

/* =========================================================
   ROLE NORMALIZATION
========================================================= */

const safeNormalizeRole = (role) => {
  try {
    return normalizeRole(role);
  } catch {
    if (!role) return "Citizen";

    const value = String(role).trim().toLowerCase();

    if (value === "admin") return "Admin";
    if (value === "college") return "College";
    if (value === "industry") return "Industry";
    if (value === "citizen") return "Citizen";

    return "Citizen";
  }
};

/* =========================================================
   USER NORMALIZATION
========================================================= */

const normalizeUser = (userData) => {
  if (!userData) return null;

  return {
    ...userData,

    id:
      userData.id ||
      userData._id ||
      null,

    name:
      userData.name ||
      userData.fullName ||
      "Citizen",

    email:
      userData.email ||
      "",

    role: safeNormalizeRole(
      userData.role || "Citizen"
    ),

    rewardPoints:
      Number(userData.rewardPoints || 0),

    resolvedComplaints:
      Number(
        userData.resolvedComplaints || 0
      ),

    lastReward:
      userData.lastReward || null,
  };
};

/* =========================================================
   DEMO ACCOUNTS
========================================================= */

const DEMO_USERS = {
  "admin@samadhansetu.com": {
    id: "admin-001",
    name: "SamadhanSetu Admin",
    email: "admin@samadhansetu.com",
    role: "Admin",
    rewardPoints: 0,
    resolvedComplaints: 0,
  },

  "college@samadhansetu.com": {
    id: "college-001",
    name: "College Representative",
    email: "college@samadhansetu.com",
    role: "College",
    rewardPoints: 0,
    resolvedComplaints: 0,
  },

  "industry@samadhansetu.com": {
    id: "industry-001",
    name: "Industry Representative",
    email: "industry@samadhansetu.com",
    role: "Industry",
    rewardPoints: 0,
    resolvedComplaints: 0,
  },
};

const DEMO_PASSWORDS = {
  "admin@samadhansetu.com":
    "Admin@123",

  "college@samadhansetu.com":
    "College@123",

  "industry@samadhansetu.com":
    "Industry@123",
};

/* =========================================================
   AUTH PROVIDER
========================================================= */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = getStoredUser();

    return normalizeUser(storedUser);
  });

  const [loading, setLoading] = useState(true);

  /* =======================================================
     CHECK SESSION
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const token =
          localStorage.getItem(TOKEN_KEY);

        /* -----------------------------------------------
           NO TOKEN
        ------------------------------------------------ */

        if (!token) {
          if (mounted) {
            setLoading(false);
          }

          return;
        }

        /* -----------------------------------------------
           DEMO TOKEN
        ------------------------------------------------ */

        if (
          token.startsWith("demo-token-")
        ) {
          const savedUser =
            getStoredUser();

          if (mounted) {
            setUser(
              normalizeUser(savedUser)
            );

            setLoading(false);
          }

          return;
        }

        /* -----------------------------------------------
           BACKEND TOKEN
        ------------------------------------------------ */

        try {
          const currentUser =
            await getCurrentUser();

          if (!mounted) return;

          if (currentUser) {
            const finalUser =
              normalizeUser(
                currentUser.user ||
                currentUser
              );

            setUser(finalUser);

            saveUser(finalUser);
          } else {
            clearAuthStorage();
            setUser(null);
          }
        } catch (error) {
          console.error(
            "Backend session verification failed:",
            error
          );

          /*
            IMPORTANT:
            Do not immediately destroy a valid
            locally stored citizen session if
            backend verification fails because
            of temporary API/network problems.
          */

          const savedUser =
            getStoredUser();

          if (savedUser) {
            setUser(
              normalizeUser(savedUser)
            );
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     LOGIN
  ======================================================= */

  const login = async (
    email,
    password
  ) => {
    const cleanEmail = String(
      email || ""
    )
      .trim()
      .toLowerCase();

    const cleanPassword = String(
      password || ""
    ).trim();

    /* -----------------------------------------------
       VALIDATION
    ------------------------------------------------ */

    if (!cleanEmail) {
      return {
        success: false,
        message:
          "Please enter your email.",
      };
    }

    if (!cleanPassword) {
      return {
        success: false,
        message:
          "Please enter your password.",
      };
    }

    /* -----------------------------------------------
       EMAIL FORMAT
    ------------------------------------------------ */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return {
        success: false,
        message:
          "Please enter a valid email address.",
      };
    }

    /* =================================================
       DEMO ADMIN / COLLEGE / INDUSTRY
    ================================================= */

    if (
      Object.prototype.hasOwnProperty.call(
        DEMO_USERS,
        cleanEmail
      )
    ) {
      const correctPassword =
        DEMO_PASSWORDS[cleanEmail];

      if (
        cleanPassword !==
        correctPassword
      ) {
        return {
          success: false,
          message:
            "Invalid email or password.",
        };
      }

      const demoUser =
        normalizeUser(
          DEMO_USERS[cleanEmail]
        );

      const demoToken =
        `demo-token-${demoUser.role.toLowerCase()}`;

      setUser(demoUser);

      saveUser(demoUser);

      localStorage.setItem(
        TOKEN_KEY,
        demoToken
      );

      console.log(
        "DEMO LOGIN SUCCESS:",
        demoUser
      );

      return {
        success: true,
        user: demoUser,
        token: demoToken,
      };
    }

    /* =================================================
       CITIZEN BACKEND LOGIN
    ================================================= */

    try {
      console.log(
        "CITIZEN LOGIN:",
        cleanEmail
      );

      const result =
        await loginUser(
          cleanEmail,
          cleanPassword
        );

      console.log(
        "LOGIN RESPONSE:",
        result
      );

      /* -----------------------------------------------
         CHECK RESPONSE
      ------------------------------------------------ */

      if (!result) {
        return {
          success: false,
          message:
            "Invalid email or password.",
        };
      }

      if (!result.user) {
        return {
          success: false,
          message:
            result.message ||
            "Invalid email or password.",
        };
      }

      /* -----------------------------------------------
         NORMALIZE USER
      ------------------------------------------------ */

      const finalUser =
        normalizeUser(
          result.user
        );

      /* -----------------------------------------------
         FORCE CITIZEN FOR PUBLIC ACCOUNT
      ------------------------------------------------ */

      if (!finalUser.role) {
        finalUser.role = "Citizen";
      }

      setUser(finalUser);

      saveUser(finalUser);

      /* -----------------------------------------------
         SAVE TOKEN
      ------------------------------------------------ */

      if (result.token) {
        localStorage.setItem(
          TOKEN_KEY,
          result.token
        );
      }

      console.log(
        "CITIZEN LOGIN SUCCESS:",
        finalUser
      );

      return {
        success: true,
        user: finalUser,
        token: result.token,
      };
    } catch (error) {
      console.error(
        "CITIZEN LOGIN ERROR:",
        error
      );

      let message =
        "Invalid email or password.";

      if (
        error?.response?.data?.message
      ) {
        message =
          error.response.data.message;
      } else if (
        error?.message
      ) {
        message = error.message;
      }

      return {
        success: false,
        message,
      };
    }
  };

  /* =======================================================
     REGISTER
  ======================================================= */

  const register = async (
    userData
  ) => {
    const name = String(
      userData?.name || ""
    ).trim();

    const email = String(
      userData?.email || ""
    )
      .trim()
      .toLowerCase();

    const password = String(
      userData?.password || ""
    ).trim();

    /* -----------------------------------------------
       VALIDATION
    ------------------------------------------------ */

    if (!name) {
      return {
        success: false,
        message:
          "Please enter your name.",
      };
    }

    if (!email) {
      return {
        success: false,
        message:
          "Please enter your email.",
      };
    }

    if (!password) {
      return {
        success: false,
        message:
          "Please enter your password.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message:
          "Password must contain at least 6 characters.",
      };
    }

    try {
      console.log(
        "CITIZEN REGISTER:",
        email
      );

      const result =
        await registerUser({
          name,
          email,
          password,

          /*
            Public registration is always
            Citizen.
          */
          role: "Citizen",
        });

      console.log(
        "REGISTER RESPONSE:",
        result
      );

      if (
        !result ||
        !result.user
      ) {
        return {
          success: false,
          message:
            result?.message ||
            "Registration failed.",
        };
      }

      const createdUser =
        normalizeUser(
          result.user
        );

      /*
        Registration does NOT automatically
        keep the user logged in.
      */

      try {
        logoutUser();
      } catch {
        // Ignore logout service error
      }

      clearAuthStorage();

      setUser(null);

      return {
        success: true,
        user: createdUser,
        message:
          "Registration successful. Please login.",
      };
    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      let message =
        "Registration failed.";

      if (
        error?.response?.data?.message
      ) {
        message =
          error.response.data.message;
      } else if (
        error?.message
      ) {
        message = error.message;
      }

      return {
        success: false,
        message,
      };
    }
  };

  /* =======================================================
     UPDATE USER
  ======================================================= */

  const updateUser = (
    updatedData
  ) => {
    if (!user) {
      return {
        success: false,
        message:
          "User not logged in.",
      };
    }

    const updatedUser =
      normalizeUser({
        ...user,
        ...updatedData,
      });

    setUser(updatedUser);

    saveUser(updatedUser);

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
      Number(
        user.rewardPoints || 0
      );

    const updatedUser =
      normalizeUser({
        ...user,

        rewardPoints:
          currentPoints +
          Number(points),

        lastReward: {
          points: Number(points),
          reason,
          date:
            new Date().toLocaleString(),
        },
      });

    setUser(updatedUser);

    saveUser(updatedUser);
  };

  /* =======================================================
     RESET REWARDS
  ======================================================= */

  const resetRewards = () => {
    if (!user) return;

    const updatedUser =
      normalizeUser({
        ...user,

        rewardPoints: 0,

        resolvedComplaints: 0,

        lastReward: null,
      });

    setUser(updatedUser);

    saveUser(updatedUser);

    window.dispatchEvent(
      new Event("rewardReset")
    );
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const logout = () => {
    try {
      logoutUser();
    } catch (error) {
      console.error(
        "Logout service error:",
        error
      );
    }

    clearAuthStorage();

    localStorage.removeItem(
      "registeredUser"
    );

    setUser(null);

    console.log(
      "USER LOGGED OUT"
    );
  };

  /* =======================================================
     CONTEXT
  ======================================================= */

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

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
   HOOK
========================================================= */

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

export default AuthContext;