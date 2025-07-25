import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("Unknown action");
  }
}

/*****************************************************/
const AuthContext = createContext();

//Component
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    useReducer,
    initialState
  );

  /*****************************************************/
  // put here the API call (instead of fake user)
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  /*****************************************************/
  function logout() {
    dispatch({ type: "logout" });
  }
  /*****************************************************/

  return (
    <AuthContext.Provider value={(user, isAuthenticated, login, logout)}>
      {children}
    </AuthContext.Provider>
  );
}

//custom hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside  AuthProvider");
}

export { AuthProvider, useAuth };
