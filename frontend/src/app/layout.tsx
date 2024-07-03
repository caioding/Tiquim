import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Campanhas",
  description: "Plataforma de financiamento coletivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        {" "}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
