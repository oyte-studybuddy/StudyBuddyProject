/**
 * v0 by Vercel.
 * @see https://v0.dev/t/IqEdKjH2AD6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "./logout";
export default function Component({ accessToken }) {
  return (
    <nav className="w-full inset-x-0 top-0 z-50 bg-gray-900 shadow dark:bg-gray-950 ">
      <div className="container  max-w-[90%] lg:max-w-4xl xl:max-w-5xl  2xl:max-w-7xl px-0 md:px-0">
        <header className="flex h-20 w-full shrink-0 items-center px--4 md:px--6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTrigger asChild>
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <MountainIcon className="h-6 w-6" />
                  <span className="text-lg font-semibold">StudyBuddy</span>
                </Link>
              </SheetTrigger>
              <div className="grid gap-4 py-6">
                <SheetTrigger asChild>
                  <Link
                    href="/"
                    className="flex w-full  items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    Home
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    href="/manage-meetings"
                    className="flex w-full  items-center py-2 text-lg font-semibold"
                    prefetch={false}
                  >
                    Manage Meetings
                  </Link>
                </SheetTrigger>
                {accessToken ? (
                  <SheetTrigger asChild>
                    {/* <Link
                      href="/signin"
                      className="flex w-full  items-center py-2 text-lg font-semibold"
                      prefetch={false}
                    >
                      Logout
                    </Link> */}
                    <LogoutButton />
                  </SheetTrigger>
                ) : (
                  <>
                    <SheetTrigger asChild>
                      <Link
                        href="/signin"
                        className="flex w-full  items-center py-2 text-lg font-semibold"
                        prefetch={false}
                      >
                        Signin
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link
                        href="/signup"
                        className="flex w-full  items-center py-2 text-lg font-semibold"
                        prefetch={false}
                      >
                        Signup
                      </Link>
                    </SheetTrigger>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-[150px] hidden lg:flex">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <MountainIcon className="h-6 w-6 text-white" />
              <span className="text-lg text-white font-semibold">Acme Inc</span>
            </Link>
          </div>
          <div className="ml-auto hidden lg:flex gap-4">
            <Link
              href="/"
              className="inline-flex h-9 w-max items-center justify-center rounded-md text-white  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Home
            </Link>
            <Link
              href="/manage-meetings"
              className="inline-flex h-9 w-max items-center justify-center rounded-md text-white  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Manage Meetings
            </Link>
            {accessToken ? (
              <LogoutButton />
            ) : (
              <>
                <Link
                  href="/signin"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md text-white  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Signin
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-9 w-max items-center justify-center rounded-md text-white  px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>
      </div>
    </nav>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/ZPrRUV51n0W
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import Link from "next/link";

// export default function Navbar() {
//   return (
//     <nav className="w-full inset-x-0 top-0 z-50 bg-gray-900 shadow dark:bg-gray-950 border-b-[0.5px] border-b-gray-50">
//       <div className="container md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl bg-red-300 px-0 md:px-0;">
//         <div className="flex h-16 items-center">
//           <Link
//             href="/"
//             className="mr-auto flex items-center gap-2 text-lg font-semibold"
//             prefetch={false}
//           >
//             <PackageIcon className="text-gray-50 w-5 h-5" />
//             <span className="text-gray-50">Acme Inc</span>
//           </Link>
//           <nav className="ml-auto flex items-center space-x-4">
//           <Link
//               href="/"
//               className="font-medium text-sm border-b-2 border-transparent transition-colors text-gray-50 hover:text-gray-50 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
//               prefetch={false}
//             >
//               Home
//             </Link>
//             <Link
//               href="/manage-meetings"
//               className="font-medium text-sm border-b-2 border-transparent transition-colors text-gray-50 hover:text-gray-50 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
//               prefetch={false}
//             >
//               Manage meetings
//             </Link>
//             <Link
//               href="/signin"
//               className="font-medium text-sm border-b-2 border-transparent transition-colors text-gray-50 hover:text-gray-50 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
//               prefetch={false}
//             >
//               Signin
//             </Link>
//             <Link
//               href="/signup"
//               className="font-medium text-sm border-b-2 border-transparent transition-colors text-gray-50 hover:text-gray-50 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
//               prefetch={false}
//             >
//               Signup
//             </Link>

//             {/* <Link
//               href="#"
//               className="font-medium text-sm border-b-2 border-transparent transition-colors text-gray-50 hover:text-gray-50 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
//               prefetch={false}
//             >
//               Pricing
//             </Link> */}
//             {/* <Link
//               href="#"
//               className="font-medium text-sm border-b-2 border-transparent transition-colors text-gray-50 hover:text-gray-50 hover:border-gray-100 dark:hover:text-gray-50 dark:hover:border-gray-800"
//               prefetch={false}
//             >
//               Contact
//             </Link> */}
//           </nav>
//         </div>
//       </div>
//     </nav>
//   );
// }

// function PackageIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m7.5 4.27 9 5.15" />
//       <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
//       <path d="m3.3 7 8.7 5 8.7-5" />
//       <path d="M12 22V12" />
//     </svg>
//   );
// }

// function XIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M18 6 6 18" />
//       <path d="m6 6 12 12" />
//     </svg>
//   );
// }
