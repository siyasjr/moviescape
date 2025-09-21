import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/components/favorites-context";
import NavBar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "moviescape",
  description: "Popular movies + your favorites",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <FavoritesProvider>
          <NavBar />
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}
