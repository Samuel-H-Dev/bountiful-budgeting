"use client"

import { useEffect, useState } from "react"

export default function Calculations({ profile, user }) {
  const [total, setTotal] = useState(0)

  const costs = profile?.filter(item => item.expense === true)

  useEffect(() => {
    let calc = 0;
    for (let i = 0; i < costs.length; i++) {
      calc += Math.floor(costs[i].amount)
    }
    console.log(user)
    setTotal(calc)
  }, [costs])

  return (
    <section className="bg-[#71A1FF] w-11/12 min-h-[10%] text-[#051A9A] overflow-y-scroll no-scrollbar max-h-[75%] scroll-smooth flex flex-wrap flex-row rounded-xl text-xl">
      <h2 className="pl-3 pt-4 font-semibold w-full underline mb-2">Calculations</h2>
      <div className="w-[45%] pb-2">
        {costs.map((expense) => (
          <div key={expense.id} className=" w-11/12 -pb-1 pl-2 border-slate-500 border-b-[1px] mx-auto my-0">
            <div className="flex flex-wrap  flex-row">
              <p className="text-md border-slate-500 border-r-[2px] w-[40%] ">{expense.title} </p>
              <p className="w-[50%] text-md text-left ml-2 my-1"> -${parseFloat(expense.amount).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[45%]">
        <div className="border-b-2 border-slate-900">
          <p>Monthly Income: ${user?.monthlyIncome}</p>
          <p>Total Expenses: ${total}</p>
        </div>
          <p>Remaining Balence: </p>
            {!user?.monthlyIncome
          ? <p>Income required</p>
          : <p> ${user?.monthlyIncome - total}</p>}
      </div>
    </section>
  )
}