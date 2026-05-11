import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Itosmart | Your AI Companion for Smarter Living",
  description: "Itosmart is your AI companion designed to make your life easier and more productive. Whether you need help with writing, coding, brainstorming, or just want to chat, Itosmart is here to assist you 24/7. Powered by the latest in AI technology, Itosmart can understand and respond to your needs in a natural and intuitive way. Experience the future of AI companionship with Itosmart today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
