import { Input } from "@/components/ui/input"   
import { Button } from "@/components/ui/button"
import ProfileButton from "./profileIcon"


export default function Navbar() {
  return (
    <div className="w-full flex items-center justify-between bg-white p-4 shadow m-0">
      <h2 className="text-3xl font-bold text-blue-600 flex items-center justify-center">
        WhoSpoke.ai
      </h2>
      <Input 
        type="text" 
        placeholder="Search..." 
        className="w-1/2" 
      />

      <div className="flex items-center gap-4">
        <Button variant="outline">Filter</Button>

        <Button className="bg-black text-white"variant="outline">Upload</Button>  

        <ProfileButton/> 
  
      </div>
    </div>
  )
}
