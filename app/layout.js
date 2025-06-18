import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/Components/Navbar";
import { StateContextProvider } from "@/Context/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "light boxes - Neon Sgins",
  description:
    "Welcome to LC SIGN Store! Here we try our best to provide you with fast and cost-effective IILUMINATED SIGNAGE SOLUTIONS for all your branding needs.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <StateContextProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <Navbar />
            {children}
          </body>
        </html>
      </StateContextProvider>
    </ClerkProvider>
  );
}
