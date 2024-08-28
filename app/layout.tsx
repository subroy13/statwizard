import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION } from "./constants";
import Navbar from "./ui/Navbar";
import { inter } from "./lib/fonts";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  icons: {
    icon: 'https://www.statwizard.in/images/logo.png',
    apple: 'https://www.statwizard.in/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-container min-h-[100vh] flex flex-col justify-between">
          <Navbar />
          <div className="content-container mx-0 px-0">
            {children}
          </div>
          {/* Below we insert the modal wrapper*/}
          <div id="modal-root"></div>
        </div>
      </body>
      <GoogleAnalytics gaId="G-97N9TLJ517" />
    </html>
  );
}
