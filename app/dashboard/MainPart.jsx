"use client"
import Calculations from "./Calculation"
import MonthlyExpenses from "./MothlyExpense"

import { useState, useEffect } from "react"



export default function MainPart() {
  const [profile, setProfile] = useState()
  const [expenseItem, setExpenseItem] = useState()
  const [itemCost, setItemCost] = useState()



  useEffect(() => {
    fetch("http://127.0.0.1:5002/dashboard/guest")   ///Change guest to uid once login is added
      .then(res => res.json())
      .then((data)=>{
        console.log(data)
        setProfile(data)
      })
      .catch(err => alert(err.message))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newItem = { 
      title: expenseItem,
      amount: itemCost,
      expense: true,
      uid: "guest"
    }

    fetch(`http://127.0.0.1:5002/dashboard/guest`, {  ///Change guest to uid once login is added
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		})
    .then((res) => res.json())
    .then(setProfile)
    .catch((err) => {
      console.error(err);
      alert(err.message);
    });
    setExpenseItem("");
    setItemCost("");
    
      
  }





  return (
    <> 
      <section className=" mx-auto w-fit h-fit mt-5 ">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setExpenseItem(e.target.value)} value={expenseItem} name="expense" placeholder="Mothly Expense" className="border-2 border-slate-900 p-1 rounded mx-1 border-opacity-60" />=
          <input type="number" onChange={(e) => setItemCost(e.target.value)} value={itemCost} name="amount" placeholder="Amount" className="border-2 border-slate-900 p-1 rounded mx-1 border-opacity-60" />
          <input type="submit" value="add" className="border-2 border-slate-900 p-1 rounded mx-1 border-opacity-60" />
        </form>
      </section>

      <div className="flex flex-wrap border-t-2 border-gray-900 flex-row w-[95%] mx-auto h-screen mt-5" >
        <section className="w-[50%]">
          {!profile
            ? <p className="text-slate-900 text-center">loading...</p>
            : <MonthlyExpenses profile={profile}/>

          }
        </section>
        
        <section className="w-[50%]">
          {!profile
            ? <p className="text-slate-900 text-center">loading...</p>
            : <Calculations profile={profile}/>

          }
        </section>

       

      </div>


    </>
  )
}