
export default function MothlyExpenses({ profile }){

  return(
  <section className=" text-black text-xl">
    {profile?.map((item) => (
    <div key={item.id} className="my-10">
      <p>{item.title}</p>
      <p>{item.amount}</p>
    </div>
    ))}
  </section>
)}