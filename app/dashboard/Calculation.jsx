export default function Calculations({ profile }){
const costs = profile.filter(item => item.expense === true)

  return(
  <div className="flex flex-wrap flex-row border-2 border-red-500">
  {costs.map((expense) => (
    <div key={expense.id} className="w-[100%]">
    <p className="w-[45%] mx-2 my-2">{expense.title} </p>
    <p className="w-[45%] text-right mx-2 my-2"> - {parseFloat(expense.amount).toLocaleString()}</p>
    </div>
  ))}
  </div>
  )
}