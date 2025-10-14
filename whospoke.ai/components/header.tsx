'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 text-white">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          whospoke<span className="text-blue-400">.ai</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link href="#features" className="hover:text-blue-400">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-400">How it works</Link>
          <Link href="#pricing" className="hover:text-blue-400">Pricing</Link>
          <Link href="#faq" className="hover:text-blue-400">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/Login" className="px-3 py-1.5 rounded-md hover:text-blue-400">
            Log in
          </Link>
          <Link
            href="/SignUp"
            className="px-3 py-1.5 rounded-md border border-white hover:bg-white hover:text-black transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}
