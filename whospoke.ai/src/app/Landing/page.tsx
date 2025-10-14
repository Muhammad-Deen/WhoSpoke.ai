// src/app/Landing/page.tsx
import Header from "../../../components/header"
import Hero from "../../../components/hero"

export default function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <main className="bg-white">
        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Built for clarity</h2>
          <p className="mt-4 text-black/70">Whospoke.ai identifies speakers across your content.</p>
        </section>
      </main>
    </>
  )
}
