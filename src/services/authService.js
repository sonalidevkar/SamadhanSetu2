
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

/* =========================================================
   ROLE NORMALIZATION
========================================================= */

const normalizeRole = (role) => {
  if (!role) return "";

  const value = String(role).trim().toLowerCase();

  switch (value) {
    case "citizen":
      return "citizen";

    case "admin":
      return "admin";

    case "college":
      return "college";

    case "industry":
      return "industry";

    // Existing backend role
    case "university":
      return "college";

    default:
      return value;
  }
};

/* =========================================================
   LOGIN USER
========================================================= */

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      }
    );

    const data = await response.json().catch(() => ({}));

    console.log("LOGIN API STATUS:", response.status);
    console.log("LOGIN API RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Invalid email or password"
      );
    }

    if (!data.success || !data.token || !data.data) {
      throw new Error(
        data.message || "Invalid login response from server"
      );
    }

    const user = {
      ...data.data,

      id:
        data.data.id ||
        data.data._id ||
        null,

      role: normalizeRole(data.data.role),
    };

    /* Save JWT */

    localStorage.setItem(
      "authToken",
      data.token
    );

    /* Save user */

    localStorage.setItem(
      "authUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "complaintUser",
      JSON.stringify(user)
    );

    return {
      success: true,
      token: data.token,
      user,
    };
  } catch (error) {
    console.error(
      "loginUser error:",
      error
    );

    throw error;
  }
};

/* =========================================================
   REGISTER USER
========================================================= */

export const registerUser = async ({
  name,
  email,
  password,
  role = "Citizen",
}) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim(),
          role,
        }),
      }
    );

    const data = await response.json().catch(() => ({}));

    console.log(
      "REGISTER API STATUS:",
      response.status
    );

    console.log(
      "REGISTER API RESPONSE:",
      data
    );

    if (!response.ok) {
      throw new Error(
        data.message || "Registration failed"
      );
    }

    if (!data.success) {
      throw new Error(
        data.message || "Registration failed"
      );
    }

    const user = data.data
      ? {
          ...data.data,

          id:
            data.data.id ||
            data.data._id ||
            null,

          role: normalizeRole(
            data.data.role
          ),
        }
      : null;

    return {
      success: true,
      token: data.token || null,
      user,
      message:
        data.message ||
        "Registration successful",
    };
  } catch (error) {
    console.error(
      "registerUser error:",
      error
    );

    throw error;
  }
};

/* =========================================================
   GET CURRENT USER
========================================================= */

export const getCurrentUser = async () => {
  const token =
    localStorage.getItem("authToken");

  if (!token) {
    throw new Error(
      "No authentication token found"
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/me`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response
      .json()
      .catch(() => ({}));

    console.log(
      "CURRENT USER STATUS:",
      response.status
    );

    if (!response.ok) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("complaintUser");

      throw new Error(
        data.message ||
          "Session expired"
      );
    }

    if (!data.success || !data.data) {
      throw new Error(
        data.message ||
          "Unable to get current user"
      );
    }

    const user = {
      ...data.data,

      id:
        data.data.id ||
        data.data._id ||
        null,

      role: normalizeRole(
        data.data.role
      ),
    };

    localStorage.setItem(
      "authUser",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "complaintUser",
      JSON.stringify(user)
    );

    return user;
  } catch (error) {
    console.error(
      "getCurrentUser error:",
      error
    );

    throw error;
  }
};

/* =========================================================
   LOGOUT
========================================================= */

export const logoutUser = () => {
  localStorage.removeItem("authToken");

  localStorage.removeItem("authUser");

  localStorage.removeItem(
    "complaintUser"
  );
};

/* =========================================================
   AUTH TOKEN
========================================================= */

export const getAuthToken = () => {
  return localStorage.getItem(
    "authToken"
  );
};

/* =========================================================
   AUTHORIZATION HEADER
========================================================= */

export const getAuthHeaders = () => {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
};

/* =========================================================
   API BASE URL
========================================================= */

export { API_BASE_URL };

/* =========================================================
   ROLE NORMALIZER
========================================================= */

export { normalizeRole };

