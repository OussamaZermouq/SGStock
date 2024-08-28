"use client";

import * as React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import { Button } from "../ui/button";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import FactoryIcon from "@mui/icons-material/Factory";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import { logOut } from "@/app/lib/actions";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Cuboid,
  Factory,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
export default function SideNavBar() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleSignOut = async () => {
    try {
      await logOut();
      // Redirect or update UI after sign out, if needed
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex-1  border-r bg-muted/40 md:block h-full max-h-screen flex flex-col gap-2">
      <nav className="grid flex-grow items-start px-2 text-base font-medium lg:px-4 py-20">
        <Link
          href="/Dashboard"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/Commande"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <ShoppingCart className="h-4 w-4" />
          Orders
        </Link>
        <Link
          href="/Produits"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <Package className="h-4 w-4" />
          Products
        </Link>
        <Link
          href="/Clients"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <Users className="h-4 w-4" />
          Customers
        </Link>
        <Link
          href="/Fournisseurs"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <Factory className="h-4 w-4" />
          Fournisseurs
        </Link>
        <Link
          href="/Fournisseurs/Matierespremieres"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
        >
          <Cuboid className="h-4 w-4" />
          Matiere Premieres
        </Link>
      </nav>
    </div>
  );
}
{
  /* 
  <div className="my-10 mx-10 sticky-0">
        <div className="my-5">
          <Button
            variant="ghost"
            className="font-semibold"
            onClick={() => router.push("/Dashboard")}
          >
            <DashboardIcon />
            Dashboard
          </Button>
        </div>
        <div className="my-5">
          <Accordion type="single" collapsible className="w-58">
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <PersonOutlineIcon />
                Clients
              </AccordionTrigger>

              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/Clients")}
                >
                  Consulter les Clients
                </Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/Clients/Ajouterclient")}
                >
                  Ajouter un Client
                </Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/Clients/modifierClient")}
                >
                  Modifier un Client
                </Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button variant={"ghost"}>Supprimer les Clients</Button>{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <GridViewIcon />
                Produits
              </AccordionTrigger>

              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/Produits")}
                >
                  Consulter les Produits
                </Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button variant={"ghost"}>Ajouter Produits</Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button variant={"ghost"}>Supprimer les Produits</Button>{" "}
              </AccordionContent>

              <Separator />

              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/Categories")}
                >
                  Consulter les Categories
                </Button>{" "}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <BookmarkBorderIcon />
                Commandes
              </AccordionTrigger>

              <AccordionContent>
                <Button variant={"ghost"}>Consulter les Commandes</Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button variant={"ghost"}>Ajouter Commandes</Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button variant={"ghost"}>Supprimer les Commandes</Button>{" "}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                <FactoryIcon />
                Fournisseurs
              </AccordionTrigger>

              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/Fournisseurs")}
                >
                  Consulter les Fournisseurs
                </Button>{" "}
              </AccordionContent>

              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    router.push("/Fournisseurs/Ajouterfournisseur")
                  }
                >
                  Ajouter Fournisseurs
                </Button>{" "}
              </AccordionContent>
              <Separator />
              <AccordionContent>
                <Button
                  variant={"ghost"}
                  onClick={() => router.push("/Fournisseurs/Matierespremieres")}
                >
                  Consulter les M.Premieres
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="my-5">
          <Button variant="ghost" className="font-semibold">
            <SettingsIcon />
            Configuration
          </Button>
        </div>
        <div className="absolute  bottom-20">
          <div className="sticky">
              <Button variant="destructive" className="font-semibold" onClick={handleSignOut}>
                Se Deconnecter
              </Button>
          </div>
        </div>
      </div>*/
}
