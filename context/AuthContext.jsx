"use client"

import { createContext, useState, useEffect } from "react"


export const AuthContext = createContext()

export function AuthProvider({ children }){

  const [profileStuff, setProfileStuff] = useState()

function go (stuff){
  setProfileStuff(stuff)
}

  return (
  <AuthContext.Provider >
  {children}
</AuthContext.Provider>
)
}