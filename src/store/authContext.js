import React, { createContext, useReducer, useEffect, useContext } from "react";

const initialState = {
  userId: null,
  token: null,
  exp: null,
  username: null,
  authenticated: false
};

const AuthContext = createContext();

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storedId = localStorage.getItem("userId");
  const storedName = localStorage.getItem("username");

  let remainingTime = storedExp - new Date().getTime();
  if (remainingTime < 0) {
    localStorage.clear();
    return null;
  }

  return {
    token: storedToken,
    exp: +storedExp,
    userId: +storedId,
    username: storedName
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { token, exp, userId, username } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("exp", exp);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      return { ...state, token, exp, userId, username, authenticated: true };
    case "LOGOUT":
      localStorage.clear();
      return initialState;
    case "RETURNING_USER":
      const { token: t, userId: u, exp: e, username: n } = action.payload;
      return { ...state, token: t, userId: +u, exp: +e, username: n, authenticated: true };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const localData = getLocalData();
    if (localData) {
      dispatch({ type: "RETURNING_USER", payload: localData });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
export { AuthProvider };