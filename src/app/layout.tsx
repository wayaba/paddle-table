import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: "Paddle Table",
  description: "Aplicación oficial para seguir los resultados de la liga amateur mas profesional de Argentina",
  metadataBase: new URL("https://paddle-table.vercel.app/")
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <Header/>
      <main className="py-8">{children}</main>
      <footer className="text-center leading-[4rem] opacity-70">
        <small>© {new Date().getFullYear()} Paddle Table - con 🧡 por <a href="mailto:pabloj.pedraza@gmail.com">Pablo Pedraza</a></small>
      </footer>
    </body>
  </html>
  );
}
