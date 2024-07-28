import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactQueryClientProvider } from "./components/ReactQueryClient";
import AuthProvider from "./states/AuthProvider";
import SnackbarStateProvider from "./states/SnackbarProvider";
import CustomSnackbar from "./components/CustomSnackbar";

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
          <SnackbarStateProvider>
            <AuthProvider>
              <Navbar />
              {children}
              <CustomSnackbar />
              <Footer />
            </AuthProvider>
          </SnackbarStateProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
