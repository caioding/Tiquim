import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";
import AuthProvider from "./states/AuthProvider";

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
        <ReactQueryClientProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
