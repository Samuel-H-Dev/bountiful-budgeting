export default function Footer(){

  const date = new Date().getFullYear()

  return(
    <footer className="border-t-2 sticky bottom-0 flex flew-row bg-[#141a3b] text-slate-200 border-zinc-900 p-2">
  
    {/*Logo*/}
    <p>&copy; {date}</p>
    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
    </span>
    
  
    </footer>
  )
}