import React, { useState, useContext } from "react";

const User = React.createContext();
const LoginUser = React.createContext();


export function UserLogin({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function login() {
    setLoggedIn(!loggedIn);
  }

  return (
    <User.Provider value={{
      loggedIn,
      name,
      email,
      setName,
      setEmail,
    }}
    >
      <LoginUser.Provider value={login}>
        {children}
      </LoginUser.Provider>

    </User.Provider>
  );
}

export function useLoginUser() {
  return useContext(LoginUser);
}
export function useUser() {
  return useContext(User);
}