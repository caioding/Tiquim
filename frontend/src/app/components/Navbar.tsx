"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  if (path === "/login" || path === "/cadastro") {
    return null;
  }
  return <></>;
}
