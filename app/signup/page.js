"use client"

import { useState, useContext, useEffect } from "react"
import { redirect } from "next/navigation"
import { AuthContext } from "@/authContext/AuthContext"
import { Button, Input, Spacer, Text } from "@nextui-org/react"


export default function signup() {



  const [error, setError] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const { handleLogin, user } = useContext(AuthContext)

  useEffect(() => {

    if (!user) {
      return
    }
    if (user) {
      redirect("/")
    }
  }, [user])

  const handleSignupForm = (e) => {
    e.preventDefault()
    const inputedEmail = email;
    const inputedPassword = password
    //now send email and passwod to api
    fetch('https://bountiful-budgeting-api.web.app/signup', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email: inputedEmail, password: inputedPassword })
    })
      //get back user and token
      .then(res => res.json())
      //store user and token then handle errors 
      .then(data => {
        if (data.message) {
          setError(data.message)
          return
        }

        handleLogin(data)
      })
      //if error
      .catch(err => setError(err.message))
  }


  return (
    <>

      <div style={{ backgroundImage: `url('../../images/loginImg.jpg')` }} className="absolute top-0 right-0 bottom-0 left-0 lg:bg-[length:110%_105%] md:bg-[length:150%_105%] bg-[length:305%_105%] bg-blue-400 object-center h-[105%] " >

        <div className="my-auto w-full">
          <div className="  mt-[10%] mx-auto w-11/12 md:w-1/2">
            <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            </div>
            <Text
              h1
              size={60}
              className="text-center"
              color="#00000095"
            > Bountiful Budgeting  </Text>
            <Spacer />
            <div className="px-8 pt-8 rounded-lg my-auto bg-cyan-500 bg-opacity-80 mx-auto lg:px-32">
              <p className="text-3xl mx-auto mt-10">
                Signup
              </p>
              <Spacer
                y={0.5}
              />
              <form onSubmit={handleSignupForm} className="flex flex-col pt-3">
                <div className="">
                  <Input
                    name="email"
                    labelLeft="Email"
                    width="100%"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col pt-4 mb-8">
                  <div className="flex  ">

                    <Input.Password
                      name="password"
                      labelLeft="Password"
                      width="100%"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error &&
                    <div classNameName="bg-red-200 border-red-600 text-red-600 border-l-4 p-4 mt-4">
                      <p>{error}</p>
                    </div>
                  }
                </div>
                <Button
                  auto
                  type="submit"
                  color="gradient"
                >

                  Submit
                </Button>
              </form>
              <div className="pt-12 pb-12 text-center">
                <p>
                  Already a memeber?
                  <a href="login" className="font-semibold ml-1 underline">
                    Login here.
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}