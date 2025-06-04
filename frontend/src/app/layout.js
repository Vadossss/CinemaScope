import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Amatic_SC } from "next/font/google";
import LayoutComponent from "../app/components/LayoutComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const amatic = Amatic_SC({
  subsets: ["cyrillic"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata = {
  title: "CinemaScope",
  description: "Лучший сайт о фильмах",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {

  return (
      <html lang="en">
          <head>
              <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <LayoutComponent>{children}</LayoutComponent>
        </body>
      </html>
  );
}
