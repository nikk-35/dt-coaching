import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DT Coaching – David Trebtau | Personal Fitness Coach",
  description: "Individuelles Fitness Coaching auf höchstem Niveau. Von 200kg zur Bestform – evidenzbasiert, persönlich, transformativ.",
  keywords: "Personal Coach, Fitness Coach, Abnehmen, Transformation, Online Coaching, David Trebtau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} ${oswald.variable} antialiased bg-dt-black text-dt-white`}>
        {children}
      </body>
    </html>
  );
}
