'use client'

import LocalStorageKeys from 'service/constants/local-storage-keys'

export const getToken = () => localStorage.getItem(LocalStorageKeys.Token)

export const cleanAuth = () => {
  localStorage.removeItem(LocalStorageKeys.Token)
  localStorage.removeItem(LocalStorageKeys.UserData)
}
