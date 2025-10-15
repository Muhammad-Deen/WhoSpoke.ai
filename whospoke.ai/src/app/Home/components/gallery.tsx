"use client"

import { useMemo, useState } from "react"
import GalleryCard from "./card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type GalleryItem = {
  id: string
  type: "video" | "audio"
  title: string
  duration: string
  date: string
  src: string
}

const MOCK_ITEMS: GalleryItem[] = [
  { id: "1", type: "video", title: "Standup Clip", duration: "0:41", date: "19/8/25", src: "/videos/video1.mp4" },
  { id: "2", type: "audio", title: "Voice Memo 01", duration: "2:10", date: "19/8/25", src: "/sample-audio.mp3" },
  { id: "3", type: "video", title: "Demo Walkthrough", duration: "1:05", date: "20/8/25", src: "/videos/video2.mp4" },
  { id: "4", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" },
  { id: "5", type: "video", title: "Demo Walkthrough", duration: "1:05", date: "20/8/25", src: "/sample-video.mp4" },
  { id: "6", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" },
   { id: "7", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" },
  { id: "8", type: "video", title: "Demo Walkthrough", duration: "1:05", date: "20/8/25", src: "/sample-video.mp4" },
  { id: "9", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" },
   { id: "10", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" },
  { id: "11", type: "video", title: "Demo Walkthrough", duration: "1:05", date: "20/8/25", src: "/sample-video.mp4" },
  { id: "12", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" },
   { id: "13", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" },
  { id: "14", type: "video", title: "Demo Walkthrough", duration: "1:05", date: "20/8/25", src: "/sample-video.mp4" },
  { id: "15", type: "audio", title: "Interview Snippet", duration: "0:55", date: "21/8/25", src: "/sample-audio.mp3" }
]

type Filter = "all" | "video" | "audio"

export default function Gallery({ searchTerm = "" }: { searchTerm?: string }) {
  const [filter, setFilter] = useState<Filter>("all")

  const items = useMemo(() => {
  let filtered = MOCK_ITEMS

  if (filter !== "all") {
    filtered = filtered.filter((i) => i.type === filter)
  }

  if (searchTerm) {
    filtered = filtered.filter((i) =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  return filtered
}, [filter, searchTerm])

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Filter control */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="audio">Audio</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <GalleryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

// "use client"

// import { useEffect, useState, useMemo } from "react"
// import GalleryCard from "./card"
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export type GalleryItem = {
//   id: string
//   type: "video" | "audio"
//   title: string
//   src: string
//   duration?: string
//   date?: string
// }

// type Filter = "all" | "video" | "audio"

// export default function Gallery({ searchTerm = "" }: { searchTerm?: string }) {
//   const [filter, setFilter] = useState<Filter>("all")
//   const [items, setItems] = useState<GalleryItem[]>([])

//   // fetch from API
//   useEffect(() => {
//     fetch("/api/videos")
//       .then((res) => res.json())
//       .then((data) => setItems(data))
//   }, [])

//   const filtered = useMemo(() => {
//     let f = items
//     if (filter !== "all") f = f.filter((i) => i.type === filter)
//     if (searchTerm) {
//       f = f.filter((i) =>
//         i.title.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     }
//     return f
//   }, [items, filter, searchTerm])

//   return (
//     <div className="flex-1 flex flex-col gap-4">
//       {/* Filter control */}
//       <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="w-full">
//         <TabsList>
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="video">Videos</TabsTrigger>
//           <TabsTrigger value="audio">Audio</TabsTrigger>
//         </TabsList>
//       </Tabs>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filtered.map((item) => (
//           <GalleryCard key={item.id} item={item} />
//         ))}
//       </div>
//     </div>
//   )
// }
