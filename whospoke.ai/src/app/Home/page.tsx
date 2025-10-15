import Navbar from "./components/navbar";
import Gallery from "./components/gallery"; 


export default function Page() {
  


  return(
  <div className="flex flex-col h-screen">
  <Navbar />

  <div className="flex flex-1">
    {/* <Sidebar /> */}
    <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
    <Gallery />
    </main>
  </div>
</div>
  
  )
}; 

