
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Sidebar() {
  return(
  <aside className="w-1/7 bg-blue-400 text-white flex flex-col p-3">
        

      <Button variant="ghost" className="bg-sky-700 p-2 rounded mt-auto">
      <Link href="/">Log out</Link>
      </Button>
    </aside>
  
  )
}; 
