"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ✅ Simple validators
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = (password: string) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters long and include a letter, number, and symbol."
      );
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Use and Privacy Policy.");
      return;
    }

    // ✅ If everything is valid, redirect to homepage
    setError("");
    router.push("/Home");
  };
  
  return (
    <div className="flex min-h-screen bg-[#f4f7ff]">
      {/*Leftside Logo*/}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="relative w-60 h-60 mb-4">
          <Image
            src={"logo2.svg"} // replace with your logo path inside /public/assets
            alt="Whospoke Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h2 className="text-4xl font-semibold text-black">whospoke.ai</h2>
      </div>

      {/* Right side (signup options) */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Sign up</h2>
          <p className="text-gray-500 mb-8">
            Sign up for free to access any of our products
          </p>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label 
                htmlFor="email"
                className="block text-sm front-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mr-2 accent-blue-600"
                />
                <span>Agree to our</span>
                <a href="#" className="text-blue-600 hover:underline">Terms of Use</a>
                <span className="mx-1">and</span>
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </label>

              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2 accent-blue-600" />
                Subscribe to our monthly newsletter
              </label>
            </div>

            {/* ReCAPTCHA placeholder */}
            <div className="border border-gray-300 rounded-xl p-4 text-center text-gray-500 text-sm">
              [ reCAPTCHA placeholder ]
            </div>

            {/* Error message */}
            {error && (
              <p className="text-red-600 text-sm font-medium text-center">
                {error}
              </p>
            )}

            {/* Sign up button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
            >
              Sign up
            </button>
          </form>

          {/* Log in link */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}