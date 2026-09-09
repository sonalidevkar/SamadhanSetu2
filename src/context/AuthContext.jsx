import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

/* =========================================================
   SAFE STORAGE HELPERS
========================================================= */

const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem("complaintUser");

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
  } catch (error) {
    console.error("Could not save logged in user:", error);
  }
};

const saveRegisteredUser = (userData) => {
  try {
    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userData)
    );
  } catch (error) {
    console.error("Could not save registered user:", error);
  }
};

const removeLoggedInUser = () => {
  try {
    localStorage.removeItem("complaintUser");
  } catch (error) {
    console.error("Could not remove logged in user:", error);
  }
};


/* =========================================================
   AUTH PROVIDER
========================================================= */

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return getStoredUser();
  });


  /* =======================================================
     LOGIN
  ======================================================= */

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    console.log("LOGIN ATTEMPT:", cleanEmail);


    /* =====================================================
       DEMO ADMIN
    ===================================================== */

    if (
      cleanEmail === "admin@samadhan.com" &&
      cleanPassword === "admin123"
    ) {
      const adminUser = {
        id: "ADMIN-001",
        name: "SamadhanSetu Admin",
        email: "admin@samadhan.com",
        mobile: "9000000001",
        city: "Solapur",
        address: "",
        role: "admin",
        organizationName: "SamadhanSetu Administration",
        organizationType: "Government",
      };

      setUser(adminUser);
      saveLoggedInUser(adminUser);

      console.log("ADMIN LOGIN SUCCESS");

      return {
        success: true,
        user: adminUser,
      };
    }


    /* =====================================================
       DEMO COLLEGE
    ===================================================== */

    if (
      cleanEmail === "college@samadhan.com" &&
      cleanPassword === "college123"
    ) {
      const collegeUser = {
        id: "COLLEGE-001",
        name: "Karmala Engineering College",
        email: "college@samadhan.com",
        mobile: "9000000002",
        city: "Solapur",
        address: "Karmala, Solapur",
        role: "college",
        organizationName: "Karmala Engineering College",
        organizationType: "College",
        department: "Civil Engineering Department",
      };

      setUser(collegeUser);
      saveLoggedInUser(collegeUser);

      console.log("COLLEGE LOGIN SUCCESS");
      console.log("USER ROLE:", collegeUser.role);

      return {
        success: true,
        user: collegeUser,
      };
    }


    /* =====================================================
       DEMO INDUSTRY
    ===================================================== */

    if (
      cleanEmail === "industry@samadhan.com" &&
      cleanPassword === "industry123"
    ) {
      const industryUser = {
        id: "INDUSTRY-001",
        name: "Samadhan Industry Partner",
        email: "industry@samadhan.com",
        mobile: "9000000003",
        city: "Solapur",
        address: "",
        role: "industry",
        organizationName: "Samadhan Industry Partner",
        organizationType: "Industry",
        department: "Technical Solutions Team",
      };

      setUser(industryUser);
      saveLoggedInUser(industryUser);

      console.log("INDUSTRY LOGIN SUCCESS");
      console.log("USER ROLE:", industryUser.role);

      return {
        success: true,
        user: industryUser,
      };
    }


    /* =====================================================
       DEMO CITIZEN
    ===================================================== */

    if (
      cleanEmail === "demo@gmail.com" &&
      cleanPassword === "123456"
    ) {
      const citizenUser = {
        id: "CITIZEN-DEMO-001",
        name: "Demo Citizen",
        email: "demo@gmail.com",
        mobile: "9876543210",
        city: "Solapur",
        address: "",
        role: "citizen",
        rewardPoints: 0,
        resolvedComplaints: 0,
        lastReward: null,
      };

      setUser(citizenUser);
      saveLoggedInUser(citizenUser);

      console.log("CITIZEN LOGIN SUCCESS");

      return {
        success: true,
        user: citizenUser,
      };
    }


    /* =====================================================
       REGISTERED CITIZEN
    ===================================================== */

    try {
      const savedRegisteredUser =
        localStorage.getItem("registeredUser");

      if (savedRegisteredUser) {
        const registeredUser =
          JSON.parse(savedRegisteredUser);

        if (
          registeredUser.email?.toLowerCase() ===
            cleanEmail &&
          registeredUser.password === cleanPassword
        ) {
          const finalUser = {
            ...registeredUser,
            role: registeredUser.role || "citizen",
            rewardPoints:
              registeredUser.rewardPoints || 0,
            resolvedComplaints:
              registeredUser.resolvedComplaints || 0,
            lastReward:
              registeredUser.lastReward || null,
          };

          setUser(finalUser);
          saveLoggedInUser(finalUser);

          console.log(
            "REGISTERED USER LOGIN SUCCESS"
          );

          return {
            success: true,
            user: finalUser,
          };
        }
      }
    } catch (error) {
      console.error(
        "Registered user login error:",
        error
      );
    }


    /* =====================================================
       INVALID LOGIN
    ===================================================== */

    return {
      success: false,
      message: "Invalid email or password",
    };
  };


  /* =========================================================
     REGISTER
  ========================================================= */

  const register = (userData) => {
    const finalUser = {
      id: `CITIZEN-${Date.now()}`,

      ...userData,

      role: "citizen",

      rewardPoints: 0,

      resolvedComplaints: 0,

      lastReward: null,
    };

    /*
      IMPORTANT:
      Save account as registered user.
      Do NOT automatically keep user logged in.
    */

    saveRegisteredUser(finalUser);

    removeLoggedInUser();

    setUser(null);

    console.log("ACCOUNT CREATED:", finalUser);

    return {
      success: true,
      user: finalUser,
    };
  };


  /* =========================================================
     UPDATE USER
  ========================================================= */

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

    /*
      Only citizens have registered account data
    */

    if (updatedUser.role === "citizen") {
      saveRegisteredUser(updatedUser);
    }

    return {
      success: true,
      user: updatedUser,
    };
  };


  /* =========================================================
     REWARD POINTS
  ========================================================= */

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
        currentPoints + Number(points),

      lastReward: {
        points,
        reason,
        date: new Date().toLocaleString(),
      },
    };

    setUser(updatedUser);

    saveLoggedInUser(updatedUser);

    if (updatedUser.role === "citizen") {
      saveRegisteredUser(updatedUser);
    }
  };


  /* =========================================================
     RESET REWARDS
  ========================================================= */

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

    if (updatedUser.role === "citizen") {
      saveRegisteredUser(updatedUser);
    }

    window.dispatchEvent(
      new Event("rewardReset")
    );
  };


  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout = () => {
    setUser(null);

    removeLoggedInUser();

    console.log("USER LOGGED OUT");
  };


  /* =========================================================
     SYNC REWARD RESET
  ========================================================= */

  useEffect(() => {
    const handleRewardReset = () => {
      const savedUser = getStoredUser();

      if (savedUser) {
        setUser(savedUser);
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


  /* =========================================================
     AUTH CONTEXT
  ========================================================= */

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