"use client"
import { useState, useContext, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"


export default function Login(){


    const router = useRouter()
    const [error, setError] = useState()
  

    const handleLoginForm = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        //now send email and passwod to api
        fetch('http://127.0.0.1:5002/login',{
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ email, password })
        })
        //get back user and token
        .then(res => res.json())
        //store user and token then handle errors 
        .then(data => {
          if(data.message){
            setError(data.message)
            return
          }
       
    
          router.push("/dashboard")
        })
        //if error
        .catch(err => setError(err.message))
      }


  return(
<>

        <div className="shadow-2xl">
                <img className="hidden absolute top-0 bottom-0 left-0 right-0 bg-cover  object-cover object-center h-[105%] md:block" src="/images/loginImg.jpg"/>
            </div>
<div className="flex relative flex-wrap w-full">
    <div className="flex flex-col  mt-[10%] w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
        </div>
        <div className="flex flex-col justify-center px-8 pt-8 rounded-lg my-auto md:justify-start md:pt-0 md:px-24 bg-cyan-500 bg-opacity-80 ml-3 lg:px-32">
            <p className="text-3xl mt-10 text-center">
                Welcome.
            </p>
            <form onSubmit={handleLoginForm} className="flex flex-col pt-3 md:pt-8">
                <div className="flex flex-col pt-4">
                    <div className="flex relative ">
                        <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                          
                            
                        </span>
                        <input type="text" id="design-login-email" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                        </div>
                    </div>
                    <div className="flex flex-col pt-4 mb-12">
                        <div className="flex relative ">
                            <span className=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                               
                            </span>
                            <input type="password" id="design-login-password" className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                            </div>
                            {error && 
              <div classNameName="bg-red-200 border-red-600 text-red-600 border-l-4 p-4 mt-4">
                <p>{error}</p>
              </div>
            }
                        </div>
                        <button type="submit" className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                            <span className="w-full">
                                Submit
                            </span>
                        </button>
                    </form>
                    <div className="pt-12 pb-12 text-center">
                        <p>
                            Don&#x27;t have an account?
                            <a href="#" className="font-semibold underline">
                                Register here.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>


</>
  )
}