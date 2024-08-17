'use client'

import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'
// @ts-ignore
import { createContext, useContextSelector } from 'use-context-selector'

import LocalStorageKeys from '@/constants/local-storage-keys'
import { isSSR } from '@/utils'
import { cleanAuth } from '@/utils/auth'
import { emitter } from '@/utils/emitter'

interface AuthContextValues {
  isLogin: boolean
  login: (email: string, password: string) => Promise<any>
  logout: () => void
  user?: any
}

type UseAuthContext = (value: AuthContextValues) => any

// createContext
const AuthContext = createContext<AuthContextValues>({} as AuthContextValues)

// Hook
export const useAuth = (selector: UseAuthContext) => useContextSelector(AuthContext, selector)

// Provider
function AuthProvider({ children }: PropsWithChildren) {
  const [isLogin, setIsLogin] = useState(
    () => !isSSR() && Boolean(localStorage.getItem(LocalStorageKeys.Token)),
  )
  const [user, setUser] = useState()

  const login = useCallback(async (email: string, password: string) => {
    console.log('✅ ~ email:::', { email, password }) // eslint-disable-line
    try {
      // const res = await authClient.login({ email, password });
      // const token = res.data?.accessToken;
      // if (token) {
      //   setIsLogin(true);
      //   localStorage.setItem(LocalStorageKeys.Token, token);
      // }
    } catch (error) {
      throw new Error('Incorrect email or password')
    }
  }, [])

  const logout = useCallback(() => {
    // Reset states
    setIsLogin(false)
    setUser(undefined)
    // Clear storage
    cleanAuth()
  }, [])

  const fetchUserInfo = useCallback(async () => {
    try {
      // const res = await userClient.getMe();
      // if (res.data) {
      //   setUser(res.data);
      //   // Save user info to local storage
      //   localStorage.setItem(LocalStorageKeys.UserData, JSON.stringify(res.data));
      // }
    } catch {
      // Failed to fetch user profile -> force logout
      logout()
    }
  }, [logout])

  useEffect(() => {
    ;(async () => {
      if (isLogin) {
        // Retrieve user info from local storage first
        const userRaw = localStorage.getItem(LocalStorageKeys.UserData)

        if (userRaw) {
          try {
            setUser(JSON.parse(userRaw))
          } catch {
            // Failed to parse user info -> try to fetch new data
            fetchUserInfo()
          }
        } else {
          fetchUserInfo()
        }
      }
    })()

    emitter.on('FORCE_LOGOUT', logout)
    return () => {
      emitter.off('FORCE_LOGOUT', logout)
    }
  }, [isLogin, logout, fetchUserInfo])

  const memoizedValue = useMemo(
    () => ({ isLogin, login, logout, user }),
    [isLogin, login, logout, user],
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}

export default AuthProvider
