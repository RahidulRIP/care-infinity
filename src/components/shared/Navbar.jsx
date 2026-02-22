// "use client";

// import Link from "next/link";
// import Container from "./Container";
// import { signOut, useSession } from "next-auth/react";

// const Navbar = () => {
//   // const data = useSession();
//   // console.log({ data: session });
//   const { data: session, status } = useSession();
//   // console.log(session?.user?.email);

//   return (
//     // 'sticky top-0' keeps the nav visible while scrolling
//     // 'z-50' ensures it stays on top of all other elements
//     <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
//       <Container>
//         <div className="flex justify-between items-center h-20">
//           {/* Logo Section */}
//           <Link href="/" className="flex items-center gap-2 group">
//             <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
//               <svg
//                 className="w-6 h-6 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2.5"
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//             </div>
//             <span className="text-2xl font-black text-slate-900 tracking-tight">
//               Care<span className="text-blue-600">.infinity</span>
//             </span>
//           </Link>

//           {/* Navigation Links */}
//           <div className="hidden md:flex items-center gap-10">
//             <Link
//               href="/"
//               className="text-sm font-bold text-slate-600 hover:text-blue-600 transition"
//             >
//               Home
//             </Link>
//             <Link
//               href="/my-bookings"
//               className="text-sm font-bold text-slate-600 hover:text-blue-600 transition"
//             >
//               My Bookings
//             </Link>

//             {/* Login Button with a 'Smart' look */}

//             {status === "loading" ? (
//               <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
//                 <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                 <span className="text-xs font-bold text-slate-500">
//                   Verifying...
//                 </span>
//               </div>
//             ) : status === "authenticated" ? (
//               <div className="flex items-center gap-5">
//                 <div className="flex flex-col items-end">
//                   <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
//                     Welcome back
//                   </span>
//                   <span className="text-sm font-bold text-slate-900">
//                     {session.user?.name}
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => signOut({ callbackUrl: "/" })}
//                   className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-100"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 href="/login"
//                 className="bg-slate-900 text-white px-7 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
//               >
//                 Login
//               </Link>
//             )}
//             {/* <Link
//               href="/login"
//               className="bg-slate-900 text-white px-7 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
//             >
//               Login
//             </Link> */}
//           </div>

//           {/* Mobile Menu Icon (Placeholder for now) */}
//           <button className="md:hidden text-slate-900">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>
//         </div>
//       </Container>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import Link from "next/link";
import Container from "./Container";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
      <Container>
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              Care<span className="text-blue-600"> Infinity</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/"
              className="text-sm font-bold text-slate-600 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/my-bookings"
              className="text-sm font-bold text-slate-600 hover:text-blue-600 transition"
            >
              My Bookings
            </Link>

            {status === "loading" ? (
              <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-bold text-slate-500">
                  Verifying...
                </span>
              </div>
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-end leading-tight">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Welcome back
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {session.user?.name}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-50 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-slate-900 text-white px-7 py-3 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-900 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Sidebar/Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2 space-y-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-base font-bold text-slate-600 px-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/my-bookings"
                className="text-base font-bold text-slate-600 px-2"
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </Link>

              <hr className="border-slate-100" />

              {status === "authenticated" ? (
                <div className="flex flex-col gap-4 px-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-400 font-bold">
                      Logged in as
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {session.user?.name}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full bg-red-50 text-red-600 py-3 rounded-xl text-sm font-bold text-center"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-slate-900 text-white py-3 rounded-xl text-sm font-bold text-center block"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
