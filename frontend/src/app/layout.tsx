import type { Metadata } from "next";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
