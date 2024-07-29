'use client';

import * as React from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import { Button } from "../ui/button";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import FactoryIcon from '@mui/icons-material/Factory';
import { useRouter } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
export default function SideNavBar() {
  const router = useRouter();
  return (
    <>
      <div className="my-10 mx-10 overflow-auto">
        <div className="my-5">
          <Button variant="ghost" className="font-semibold" onClick={()=> router.push('/')}>
            <DashboardIcon />
            Dashboard
          </Button>
        </div>
        <div className="my-5">
          <Accordion type="single" collapsible className="w-58" >
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <PersonOutlineIcon />
                Clients
              </AccordionTrigger>
              
              <AccordionContent><Button variant={"ghost"} onClick={()=> router.push('/Clients')}>Consulter les Clients</Button> </AccordionContent>
              
              <AccordionContent><Button variant={"ghost"} onClick={()=> router.push('/Clients/Ajouterclient')}>Ajouter un Client</Button> </AccordionContent>
              
              <AccordionContent><Button variant={"ghost"} onClick={()=> router.push('/Clients/modifierClient')}>Modifier un Client</Button> </AccordionContent>

              <AccordionContent><Button variant={"ghost"}>Supprimer les Clients</Button> </AccordionContent>
              

            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <GridViewIcon />
                Produits
              </AccordionTrigger>

              <AccordionContent><Button variant={"ghost"}>Consulter les Produits</Button> </AccordionContent>
              
              <AccordionContent><Button variant={"ghost"}>Ajouter Produits</Button> </AccordionContent>
              
              <AccordionContent><Button variant={"ghost"}>Supprimer les Produits</Button> </AccordionContent>

              <Separator />

              <AccordionContent><Button variant={"ghost"} onClick={()=>router.push('/Categories')}>Consulter les Categories</Button> </AccordionContent>

            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <BookmarkBorderIcon />
                Commandes
              </AccordionTrigger>

              <AccordionContent><Button variant={"ghost"}>Consulter les Commandes</Button> </AccordionContent>
              
              <AccordionContent><Button variant={"ghost"}>Ajouter Commandes</Button> </AccordionContent>
              
              <AccordionContent><Button variant={"ghost"}>Supprimer les Commandes</Button> </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>
                <FactoryIcon />
                Fournisseurs
              </AccordionTrigger>

              <AccordionContent><Button variant={"ghost"} onClick={()=>router.push('/Fournisseurs')}>Consulter les Fournisseurs</Button> </AccordionContent>
              
              <AccordionContent><Button variant={"ghost"} onClick={()=>router.push('/Fournisseurs/Ajouterfournisseur')}>Ajouter Fournisseurs</Button> </AccordionContent>
              <Separator />
              <AccordionContent><Button variant={"ghost"} onClick={()=>router.push('/Fournisseurs/Matierespremieres')}>Consulter les M.Premieres</Button></AccordionContent>
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
          <Button variant="destructive" className="font-semibold">
            Se Deconnecter
          </Button>
        </div>
        </div>
      </div>
    </>
  );
}
