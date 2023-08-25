"use client"

import { AuthContext } from "@/authContext/AuthContext"
import { useState, useEffect, useContext } from "react"
import { Modal, Input, Row, Button, Text, Navbar, Link, Loading, Switch } from "@nextui-org/react";

import { redirect } from "next/navigation";


export default function DayToDay() {
  const [profile, setProfile] = useState()
  const [expenseItem, setExpenseItem] = useState()
  const [itemCost, setItemCost] = useState()
  const [visible, setVisible] = useState(false);

  const { user, token, setUser, setToken, handleLogout} = useContext(AuthContext)


  useEffect(() => {
    if (!user) {
      const previousUser = sessionStorage.getItem("user")
      const previousToken = sessionStorage.getItem("token")
      console.log('Session Storage', user)

      if(previousToken) setToken(previousToken)
      if(previousUser) {
        setUser(JSON.parse(previousUser))
      } else {
        redirect("/login")
      }
    }
    if (user) {
      console.log('ifUser', user)
      console.log('ifUser token', token)
      fetch(`https://bountiful-budgeting-api.web.app/dashboard/${user.id}`, {
        headers: {
          "Content-type": "application/json",
          "Authorization": token
        }
      })
        .then(res => res.json())
        .then((data) => {
          setProfile(data)
        })
        .catch(err => alert(err.message))
    }

  }, [user])

  const handler = () => setVisible(true);

  const closeHandler = () => {

    setVisible(false);
    console.log("closed");
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(user)
    console.log(expenseItem)
    console.log(itemCost)
    console.log(selected)


    if (!expenseItem || !itemCost  /*|| selected === "Select One"*/ ) {
      alert("all field must be filled")
      return
    }
    // let isExpense;
    // if (selected == "Expense") {
    //   isExpense = true
    //   console.log("its setting it to true", isExpense)
    // }
    // if (selected == "Income") {
    //   isExpense = false
    //   console.log("its setting it to false", isExpense)
    // }
    const newItem = {
      title: expenseItem,
      amount: itemCost,
      expense: true,
      uid: user.id
    }
  }

  const collapseItems = [
    "Features",
    "Customers",
    "Pricing",
    "Company",
    "Legal",
    "Team",
    "Help & Feedback",
    "Login",
    "Sign Up",
  ];

  

  return(
    <>
    
    <>
    <header className="flex flex-wrap mt-2 w-[99%] flex-rowborder-4">

    
      <div className=" text-slate-100 rotate-90 mx-8"> 
      <button className=" text-slate-100 p-1 rounded-lg  hover:border">|||</button>
      </div>
    
        
          
       
               
          <a  href="/">
          <div className="flex title-font items-center mt-2 text-gray-950 w-fit  font-bold mb-4 md:mb-0">
            <img  src="../../images/Logo.png" className="max-h-10 aspect-auto" />
            <span className="ml-3 text-blue-400 text-3xl opacity-80">Bountiful Budgeting</span>
          </div>
          </a>
        
        
        

        <div className="md:w-[35%] w-fit  mx-auto my-2 items-center">
            <Button
              auto
             
              color="gradient"
              shadow onPress={handler}>
              Add Item +
            </Button>
          
          </div>
          <Button
            auto
            onClick={handleLogout}
            className="bg-violet-900"
          > <Text color="#fff">Log Out</Text>
          </Button>



        
      
      
  
      </header>

 
      <section className=" mx-auto w-fit h-fit mt-5 ">
        <div>

          <Modal
            closeButton
            blur
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <form onSubmit={handleSubmit}>

              <Modal.Header>
                <Text>
                  <Text b size={18}>
                    New Item
                  </Text>
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Input
                  onChange={(e) => setExpenseItem(e.target.value)}
                  clearable
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Water Bill"
                  labelLeft="title"
                />
                <Input
                  onChange={(e) => setItemCost(e.target.value)}

                  type="number"
                  bordered
                  fullWidth
                  color="primary"
                  size="lg"
                  placeholder="Ex:300"
                  labelLeft="Amount"
                />
                <Row justify="left">


                  {/* <Dropdown>
                    <Dropdown.Button >{selected}</Dropdown.Button>
                    <Dropdown.Menu
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selected}
                      onSelectionChange={e => setSelected(e.anchorKey)}
                    >
                      <Dropdown.Item key="Expense">Expense</Dropdown.Item>
                      <Dropdown.Item key="Income">Income</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </Row>


              </Modal.Body>
              <Modal.Footer justify="space-evenly">
                <Button auto flat color="error" onPress={closeHandler}>
                  Close
                </Button>
                <Button type="submit" auto onPress={closeHandler}>
                  Add
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </section>
      </>
      </>
  

)}
