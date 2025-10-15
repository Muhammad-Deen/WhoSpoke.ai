import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Play, AudioLines } from "lucide-react"
import type { GalleryItem } from "./gallery"

export default function GalleryCard({ item }: { item: GalleryItem }) {
  const isVideo = item.type === "video"

  return (
    <Dialog>
      {/* Card is the clickable trigger */}
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition">
          <div className="relative h-40 bg-gray-200 flex items-center justify-center">
            {isVideo ? <Play /> : <AudioLines />}
            <Badge className="absolute bottom-2 left-2 text-[10px]">{item.duration}</Badge>
            <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px]">
              {item.date}
            </Badge>
          </div>
          <CardContent className="p-3 flex items-center justify-between">
            <div className="text-sm font-medium truncate">{item.title}</div>
            <Badge variant={isVideo ? "default" : "outline"} className="capitalize">
              {item.type}
            </Badge>
          </CardContent>
        </Card>
      </DialogTrigger>

      {/* Modal window */}
      <DialogContent className="max-w-5xl w-full h-[70vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>

        {/* Media player */}
        <div className="flex-1 flex items-center justify-center bg-black rounded">
          {isVideo ? (
            <video controls className="w-full h-full rounded">
              <source src={item.src} type="video/mp4" />
            </video>
          ) : (
            <audio controls className="w-full">
              <source src={item.src} type="audio/mpeg" />
            </audio>
          )}
        </div>

        {/* Transcription placeholder */}
        <div className="mt-4 p-4 bg-gray-100 rounded h-40 overflow-y-auto">
          <h3 className="font-semibold mb-2">Transcription</h3>
          <p className="text-sm text-gray-700">
             
            Pyannote Transcription to be added here.
          </p>
        </div>
      </DialogContent>
     

    </Dialog>
  )
}

////////////////////////////

// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Play, AudioLines } from "lucide-react"
// import type { GalleryItem } from "./gallery"

// export default function GalleryCard({ item }: { item: GalleryItem }) {
//   const isVideo = item.type === "video"
//   const [segments, setSegments] = useState<any[]>([])

//   useEffect(() => {
//     fetch(`/api/transcripts/${item.id}`)
//       .then((res) => res.json())
//       .then((data) => setSegments(data.segments))
//       .catch(() => setSegments([]))
//   }, [item.id])

//   return (
//     <Dialog>
//       {/* Card is the clickable trigger */}
//       <DialogTrigger asChild>
//         <Card className="cursor-pointer hover:shadow-lg transition">
//           <div className="relative h-40 bg-gray-200 flex items-center justify-center">
//             {isVideo ? <Play /> : <AudioLines />}
//             {item.duration && (
//               <Badge className="absolute bottom-2 left-2 text-[10px]">
//                 {item.duration}
//               </Badge>
//             )}
//             {item.date && (
//               <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px]">
//                 {item.date}
//               </Badge>
//             )}
//           </div>
//           <CardContent className="p-3 flex items-center justify-between">
//             <div className="text-sm font-medium truncate">{item.title}</div>
//             <Badge variant={isVideo ? "default" : "outline"} className="capitalize">
//               {item.type}
//             </Badge>
//           </CardContent>
//         </Card>
//       </DialogTrigger>

//       {/* Modal window */}
//       <DialogContent className="max-w-6xl w-full h-[70vh] flex flex-col">
//         <DialogHeader>
//           <DialogTitle>{item.title}</DialogTitle>
//         </DialogHeader>

//         {/* Main body: player + transcript side by side */}
        
//           {/* Media player */}
//           <div className="flex-[3] flex items-center justify-center bg-black rounded">
//             {isVideo ? (
//               <video controls className="w-full h-full rounded">
//                 <source src={item.src} type="video/mp4" />
//               </video>
//             ) : (
//               <audio controls className="w-full">
//                 <source src={item.src} type="audio/mpeg" />
//               </audio>
//             )}
//           </div>

//           {/* Transcript */}
//           <div className="flex-[2] p-4 bg-gray-100 rounded overflow-y-auto">
//             <h3 className="font-semibold mb-2">Transcription</h3>
//             {segments.length > 0 ? (
//               segments.map((seg, i) => (
//                 <p key={i} className="text-sm text-gray-700 mb-1">
//                   <span className="font-bold">{seg.speaker}:</span> {seg.text}
//                 </p>
//               ))
//             ) : (
//               <p className="text-sm text-gray-500">Loading transcript…</p>
//             )}
//           </div>
      
//       </DialogContent>
//     </Dialog>
//   )
// }

// ///////////////////// USE BELOW
// "use client"

// import { useEffect, useState, useRef } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Play, AudioLines } from "lucide-react"
// import type { GalleryItem } from "./gallery"

// type Segment = {
//   start: number
//   end: number
//   speaker: string
//   text: string
// }

// export default function GalleryCard({ item }: { item: GalleryItem }) {
//   const isVideo = item.type === "video"
//   const [segments, setSegments] = useState<Segment[]>([])
//   const [currentTime, setCurrentTime] = useState(0)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const transcriptRef = useRef<HTMLDivElement>(null)

//   // Load transcript from API
//   useEffect(() => {
//     fetch(`/api/transcripts/${item.id}`)
//       .then((res) => res.json())
//       .then((data) => setSegments(data.segments || []))
//       .catch(() => setSegments([]))
//   }, [item.id])

//   // Sync video time
//   useEffect(() => {
//     const video = videoRef.current
//     if (!video) return

//     const handleTimeUpdate = () => setCurrentTime(video.currentTime)
//     video.addEventListener("timeupdate", handleTimeUpdate)
//     return () => video.removeEventListener("timeupdate", handleTimeUpdate)
//   }, [])

//   // Auto-scroll transcript to active line
//   // Auto-scroll to the latest revealed line
// useEffect(() => {
//   if (transcriptRef.current) {
//     const lastLine = transcriptRef.current.querySelector("p:last-child")
//     if (lastLine) {
//       lastLine.scrollIntoView({ behavior: "smooth", block: "nearest" })
//     }
//   }
// }, [currentTime, segments])


//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Card className="cursor-pointer hover:shadow-lg transition">
//           <div className="relative h-40 bg-gray-200 flex items-center justify-center">
//             {isVideo ? <Play /> : <AudioLines />}
//             {item.duration && (
//               <Badge className="absolute bottom-2 left-2 text-[10px]">
//                 {item.duration}
//               </Badge>
//             )}
//             {item.date && (
//               <Badge variant="secondary" className="absolute bottom-2 right-2 text-[10px]">
//                 {item.date}
//               </Badge>
//             )}
//           </div>
//           <CardContent className="p-3 flex items-center justify-between">
//             <div className="text-sm font-medium truncate">{item.title}</div>
//             <Badge variant={isVideo ? "default" : "outline"} className="capitalize">
//               {item.type}
//             </Badge>
//           </CardContent>
//         </Card>
//       </DialogTrigger>

//       {/* Modal */}
//       <DialogContent className="max-w-6xl w-full h-[70vh] flex flex-col">
//         <DialogHeader>
//           <DialogTitle>{item.title}</DialogTitle>
//         </DialogHeader>

        
//           {/* Player */}
//           <div className="flex-[3] flex items-center justify-center bg-black rounded">
//             {isVideo ? (
//               <video ref={videoRef} controls className="w-full h-full rounded">
//                 <source src={item.src} type="video/mp4" />
//               </video>
//             ) : (
//               <audio ref={videoRef as any} controls className="w-full">
//                 <source src={item.src} type="audio/mpeg" />
//               </audio>
//             )}
//           </div>

//           <div
//             ref={transcriptRef}
//             className="flex-[2] p-4 bg-gray-100 rounded overflow-y-auto"
//           >
//             <h3 className="font-semibold mb-2">Transcription</h3>
//             {segments.length > 0 ? (
//               segments
//                 .filter((seg) => seg.start <= currentTime) // reveal once start time is hit
//                 .map((seg, i) => (
//                   <p
//                     key={i}
//                     className="transcript-line text-sm text-gray-700 mb-1"
//                   >
//                     <span className="font-bold">{seg.speaker}:</span> {seg.text}
//                   </p>
//                 ))
//             ) : (
//               <p className="text-sm text-gray-500">Loading transcript…</p>
//             )}
//           </div>
      
//       </DialogContent>
//     </Dialog>
//   )
// }
