import "./globals.css";
// import { ThemeProvider } from "@/context/ThemeContext";
import { HeroUIProvider } from "@heroui/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "StudyNook | Home",
  description:
    "Browse and book quiet, private study rooms in your library. List your own room and earn.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <ThemeProvider> */}
          {/* <HeroUIProvider> */}
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          {/* </HeroUIProvider> */}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}