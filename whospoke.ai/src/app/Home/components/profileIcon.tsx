"use client"

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import * as React from "react" 
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"


export default function ProfileButton() {
return (

    <DropdownMenu>
         <DropdownMenuTrigger asChild>
        <Button className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-500" variant="outline">JD</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>
                Settings
            </DropdownMenuLabel>
            <DropdownMenuLabel>
                <Link href="/Landing">Logout</Link>
            </DropdownMenuLabel>

        </DropdownMenuContent>


    </DropdownMenu>

    


    )
  
} 