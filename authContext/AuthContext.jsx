"use client"


import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState()

  
    useEffect(() => {
      if(!user){
        //looking to see if user was stored in session data
        const previousUser = sessionStorage.getItem("user")
        console.log('Session Storage', user)
        if(previousUser){
          //if so lets set state back to that user
          setUser(JSON.parse(previousUser))
        console.log('Session Storage', user)

        }
      }
    }, [])

  const handleLogin = (data) => {
    console.log("data recived by handle login ", data)
    console.log("data set in user ", JSON.stringify(data))

    setUser(JSON.stringify(data))
    sessionStorage.setItem("user", JSON.stringify(data))
  }

  const handleLogout = () => {
    setUser()
    sessionStorage.clear()
  }


  return (
  <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
    {children}
  </AuthContext.Provider>
)

}
