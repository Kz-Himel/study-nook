import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastContainer } from 'react-toastify';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "StudyNook | Home",
  description:
    "Browse and book quiet, private study rooms in your library. List your own room and earn.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning >
      <body>
        <ThemeProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}