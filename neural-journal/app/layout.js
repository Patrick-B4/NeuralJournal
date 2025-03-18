import "./globals.css";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/header";
import ClerkProviderWrapper from "./ClerkProviderWrapper";
import { Toaster } from "sonner";
import "react-quill-new/dist/quill.snow.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Neural Journal",
  description: "An AI Journaling App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {/* Now we wrap the body contents in your client-side Clerk provider */}
        <ClerkProviderWrapper>
          <div className="bg-[rgba(0,0,0,0.9)] fixed -z-10 inset-0" />
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />
          <footer className="bg-violet-300 py-12 bg-opacity-10">
            <div className="mx-auto px-4 text-center text-gray-500">
              <p>Made with love by Patrick and Roy</p>
            </div>
          </footer>
        </ClerkProviderWrapper>
      </body>
    </html>
  );
}

// import { Header } from "@radix-ui/react-accordion";
// import "./globals.css";
// import {Inter} from "next/font/google";
// import SiteHeader from "@/components/header";
// import { ClerkProvider } from "@clerk/nextjs";

// const inter = Inter({subsets: ["latin"]});

// export const metadata = {
//   title: "Neural Journal",
//   description: "An AI Journaling App",
// };

// export default function RootLayout({ children }) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//       <body
//         className={`${inter.className}`}>
//           <div className="bg-[url('/bg.png')] opacity-50 fixed -z-10
//             inset-0"/>
//           <SiteHeader/>
//           <main className="min-h-screen">
//             {children}
//           </main>
//           <footer className="bg-orange-300 py-12 bg-opacity-10">
//             <div className="mx-auto px-4 text-center text-gray-900">
//               <p>Made with love by Patrick and Roy</p>
//             </div>

//           </footer>

//       </body>
//     </html>
//     </ClerkProvider>

//   );
// }
