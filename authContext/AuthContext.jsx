"use client"


import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState()
  const [token, setToken] = useState()

  
 
       useEffect(() => {
      if(!user){
        //looking to see if user was stored in session data
        const previousUser = sessionStorage.getItem("user")
        const previousToken = sessionStorage.getItem("token")
        console.log('Session Storage', user)

        if(previousUser) setUser(JSON.parse(previousUser))
        if(previousToken) setToken(previousToken)
      }
    }, [])

  const handleLogin = (data) => {
    console.log("data recived by handle login ", data)
    console.log("data set in token ", data.token)

    setUser(data.user)
    setToken(data.token)
    sessionStorage.setItem("user", JSON.stringify(data.user))
    sessionStorage.setItem("token", data.token)
  }

  const handleLogout = () => {
    setUser()
    setToken()
    sessionStorage.clear()
  }


  return (
  <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
    {children}
  </AuthContext.Provider>
)

}
