import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION } from "./constants";
import Navbar from "./ui/Navbar";
import { inter } from "./lib/fonts";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
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
    </html>
  );
}
