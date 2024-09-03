"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Package, Users, Factory, Cuboid, Shapes } from "lucide-react";
import Link from "next/link";

export default function SideNavBar() {
  const pathname = usePathname(); 

  const linkClasses = (href:string) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted ${
      pathname === href ? "font-extrabold text-teal-500" : ""
    }`;
    //font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 optional tailwind find a light and dark mode colors

  return (
    <div className="flex-1 border-r bg-muted/40 md:block h-full max-h-screen flex flex-col gap-4 rounded-r-lg">
      <nav className="grid flex-grow items-start px-2 text-base font-medium lg:px-4 gap-2 py-20">
        <Link href="/Dashboard" className={linkClasses("/Dashboard")}>
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link href="/Commande" className={linkClasses("/Commande")}>
          <ShoppingCart className="h-4 w-4" />
          Orders
        </Link>
        <Link href="/Produits" className={linkClasses("/Produits")}>
          <Package className="h-4 w-4" />
          Products
        </Link>
        <Link href="/Categories" className={linkClasses("/Categories")}>
          <Shapes className="h-4 w-4"/>
          Categories
        </Link>
        <Link href="/Clients" className={linkClasses("/Clients")}>
          <Users className="h-4 w-4" />
          Customers
        </Link>
        <Link href="/Fournisseurs" className={linkClasses("/Fournisseurs")}>
          <Factory className="h-4 w-4" />
          Fournisseurs
        </Link>
        <Link href="/Fournisseurs/Matierespremieres" className={linkClasses("/Fournisseurs/Matierespremieres")}>
          <Cuboid className="h-4 w-4" />
          Matiere Premieres
        </Link>
      </nav>
    </div>
  );
}
