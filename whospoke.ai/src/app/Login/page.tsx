import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#EEF3FF]">
      {/*Leftside Logo*/}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="relative" style={{ width: '50vw', height: '50vh' }}>
          <Image
            src="/logo.svg" // replace with your logo path inside /public/assets
            alt="Whospoke Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        {/* <h2 className="text-4xl font-semibold text-black">whospoke.ai</h2> */}
      </div>

      {/* Right side (signup options) */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10">
          {/* constrain all inner content */}
          <div className="w-full max-w-sm mx-auto">
            <h1 className="text-3xl font-bold text-black text-center mb-4">
              Find the voice,<br />discover the video.
            </h1>
            <p className="text-gray-600 mb-8 text-sm text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
            </p>

            {/* Social buttons */}
            <button className="w-full border border-gray-300 rounded-full py-3 mb-4 text-black hover:bg-gray-100">
              <span className="flex items-center justify-center space-x-2">
                <Image
                  src="/logo-mail.svg"
                  alt="Mail"
                  width={18}
                  height={18}
                />
                <span>Continue with Email</span>
              </span>
            </button>
            <button className="w-full border border-gray-300 rounded-full py-3 mb-4 text-black hover:bg-gray-100">
              <span className="flex items-center justify-center space-x-2">
                <Image
                  src="/logo-google.svg"
                  alt="Google"
                  width={18}
                  height={18}
                />
                <span>Continue with Google</span>
              </span>
            </button>
            <button className="w-full border border-gray-300 rounded-full py-3 mb-6 text-black hover:bg-gray-100">
              <span className="flex items-center justify-center space-x-2">
                <Image
                  src="/logo-facebook.svg"
                  alt="Facebook"
                  width={18}
                  height={18}
                />
                <span>Continue with Facebook</span>
              </span>
            </button>

            <div className="flex items-center mb-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Email signup */}
            <button className="w-full bg-black text-white font-semibold rounded-full py-4 mb-5 hover:bg-gray-900">
              <Link href="/SignUp" className="hover:underline">
                Sign Up with email
              </Link>
            </button>
            

            <p className="text-xs text-gray-600 text-center leading-5">
              By signing up, you agree to the{" "}
              <a href="#" className="text-blue-600 underline">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-600 underline">Privacy Policy</a>, including{" "}
              <a href="#" className="text-blue-600 underline">cookie use</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}