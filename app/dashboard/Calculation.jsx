export default function Calculations({ profile }) {
  const costs = profile?.filter(item => item.expense === true)

  return (
    <section className="bg-[#71A1FF] w-11/12 min-h-[10%] text-[#051A9A] overflow-y-scroll max-h-[85%] flex flex-wrap flex-row rounded-xl text-xl">
          <h2 className="pl-3 pt-4 font-semibold w-full underline ">Calculations</h2>
          <div className="w-[45%]">
         {costs.map((expense) => (
        <div key={expense.id} className=" w-11/12  pl-2 border-slate-500 border-b-[1px] py-1 mx-auto my-4">
          <div className="flex flex-wrap  flex-row">
            <p className="text-lg border-slate-500 border-r-[2px] w-[40%] ">{expense.title} </p>
            <p className="w-[50%] text-lg text-left ml-2 my-2"> -${parseFloat(expense.amount).toLocaleString()}</p>
          </div>
        </div>
      ))}
      </div>
   
    </section>
  )
}