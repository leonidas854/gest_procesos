import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Procesos",
  description: "Descubre aprendiendo con patos de goma.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
