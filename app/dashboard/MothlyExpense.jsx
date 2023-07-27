
export default function MothlyExpenses({ profile }){

  return(
  <section className=" text-black text-xl">
    {profile?.map((item) => (
    <div key={item.id} className="my-5">
      <div className="flex flex-wrap flex-row">
      <p className="w-[40%]">{item.title}</p>
      <p className="w-[40%]">{item.amount}</p>

      </div>
    </div>
    ))}
  </section>
)}