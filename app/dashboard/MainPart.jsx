"use client"

import Calculations from "./Calculation"
import MonthlyExpenses from "./MothlyExpense"
import { AuthContext } from "@/authContext/AuthContext"
import { useRouter } from "next/navigation"
import { useState, useEffect, useContext } from "react"
import { Modal, Input, Row, Checkbox, Dropdown, Button, Text, Loading } from "@nextui-org/react";



export default function MainPart() {
  const { user, token , handleLogout} = useContext(AuthContext)
  const [profile, setProfile] = useState()
  const [expenseItem, setExpenseItem] = useState()
  const [itemCost, setItemCost] = useState()
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("Select One");



  const Router = useRouter()

  useEffect(() => {
    console.log('useEffect', user)
    if (!user) {
      Router.push("/login")
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
    let isExpense;
    if (selected == "Expense") {
      isExpense = true
      console.log("its setting it to true", isExpense)
    }
    if (selected == "Income") {
      isExpense = false
      console.log("its setting it to false", isExpense)
    }
    const newItem = {
      title: expenseItem,
      amount: itemCost,
      expense: true,
      uid: user.id
    }



    fetch(`https://bountiful-budgeting-api.web.app/dashboard/${user.id}`, {  ///Change guest to uid once login is added
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token

      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res)
        setProfile(res)
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
    setExpenseItem("");
    setItemCost("");
    setSelected("Select One")

  }

 
  async function deleteEvent(itemID, uid){
    console.log(itemID)
    console.log(uid)
    fetch(`https://bountiful-budgeting-api.web.app/dashboard/${uid}`, {  ///Change guest to uid once login is added
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token

      },
      body: JSON.stringify({id: itemID}),
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res)
        setProfile(res)
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  } 




  return (
    <>
      <header className=" body-font ">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font items-center text-gray-950 font-bold mb-4 md:mb-0">

            <span className="ml-3 text-blue-400 text-3xl opacity-80">Bountiful Budgeting</span>
          </a>
          <nav className="md:w-[35%]  mx-auto my-2 items-center">
            <Button
              auto
             
              color="gradient"
              shadow onPress={handler}>
              Add Item +
            </Button>
          </nav>
          <Button
            auto
            onClick={handleLogout}
            className="bg-violet-900"
          > <Text color="#fff">Log Out</Text>
          </Button>
        </div>
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

      <div className="flex flex-wrap h-screen flex-row w-[95%] mx-auto mt-5" >
        {!profile
          ? <Loading color="secondary" type="points" className="w-fit mx-auto h-fit mt-9" textColor="primary" size="xl">Please Wait</Loading>
          : <>
            <section className="overflow-scroll w-[50%]">
              <MonthlyExpenses user={user} deleteEvent={deleteEvent} profile={profile} />

            </section>

            <section className=" w-[50%]">
              <Calculations profile={profile} />

            </section>
          </>
        }


      </div>


    </>
  )
}
