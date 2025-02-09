import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import create_post from "@/../public/assets/create_post.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Img Blog",
  description: "Post your images and comment on others' images!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="header">
          <Link href="/about">About Us</Link>
          <Link href="/">Img Blog</Link>
          <Link href="/new-post">
            <Image
              src={create_post}
              alt="A black and white icon showing a pen writing on paper; this is the icon for 'Create Post'."
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
