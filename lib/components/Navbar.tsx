
"use client";

import Link from "next/link";
import { Film, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <header className="w-full border-b">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
            <Film className="h-5 w-5" />
            <span>MovieBox</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/">Popular</Link>
          </Button>
          <Button asChild>
            <Link href="/favorites" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
