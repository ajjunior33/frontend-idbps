import { createContext, useEffect, useState } from "react";
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from "nookies"

import { recoverUserInformation, signInRequest } from "../service/auth";
import { api } from '../service/api'

export const AuthContext = createContext({});


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  useEffect(() => {

    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      recoverUserInformation(token)
        .then(response => {
          setUser(response.user)
        })
    }

  }, []);

  async function signIn({ email, password }) {
    const { token, user } = await signInRequest({ email, password });
    setCookie(undefined, "nextauth.token", token, {
      maxAge: 60 * 60 * 1 //1 hour
    });

    api.defaults.headers = {
      Authorization: `Bearer ${token}`
    };

    setUser(user)
    Router.push("/dashboard");
  }

  async function signOut() {
    destroyCookie(undefined, "nextauth.token")
    setUser(null)
    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
