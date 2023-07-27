"use client"

import { useContext } from "react"
import { AuthContext } from "@/authContext/AuthContext"

export default function Header(){

  const {handleLogout} = useContext(AuthContext)

  return(
    <>
    <header className="text-gray-600 body-font bg-green-400 bg-opacity-70">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    
      <span className="ml-3 text-xl opacity-70">Bountiful Budgeting</span>
    </a>
    <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">

    </nav>
    <button onClick={handleLogout} className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Log Out
     
    </button>
  </div>
</header>
    </>
  )
}